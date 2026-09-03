(() => {
  'use strict';

  const controller = new AbortController();
  const { signal } = controller;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let journeyTimer = 0;
  let dialogScrollPosition = 0;

  const atlasContent = {
    supplier: {
      label: 'EXTERNAL SUPPLY / 00',
      title: '供应商',
      description: '外部供给对象提供真实商品或服务，其编码、库存和履约方式不应直接暴露给上层权益业务。',
      change: '外部产品、库存、成本与履约接口变化',
      decision: '让外部差异止步于供给边界，不直接进入权益配置。',
      objects: ['供应商档案与接入状态', '外部产品编码与履约方式', '成本、库存与接口差异'],
      href: '',
      sectionHref: '#supply'
    },
    depot: {
      label: 'SUPPLY / 01',
      title: '云仓',
      description: '把不同供应商提供的非标准产品，转化为可被上层稳定调用的标准商品规格。',
      change: '供应商接入、编码与商品变化',
      decision: '用内部商品规格隔离外部供应差异。',
      objects: ['供应商与供应商产品', '品牌、商品与商品规格', '多供应商供货关系'],
      href: './prototypes/rights-management/depot/dist/index.html',
      sectionHref: '#supply'
    },
    omni: {
      label: 'SERVICE / 02',
      title: '万象',
      description: '将标准商品组织为权益库存，再配置为原子、组合或 N 选 M 权益，并管理发放与核销。',
      change: '权益组合、库存调用与履约规则变化',
      decision: '让库存资源与对外权益表达分别变化。',
      objects: ['权益库存与调用策略', '原子 / 组合权益配置', '发放、短信、核销与订单'],
      href: './prototypes/rights-management/omni/dist/index.html',
      sectionHref: '#service'
    },
    operator: {
      label: 'BUSINESS PARTNER / 03',
      title: '运营商',
      description: '承载不同省份和专业公司的套餐标识与订购结果，办理成功后触发对应权益履约。',
      change: '省份、套餐标识、合作关系与订购结果变化',
      decision: '把外部订购结果翻译为内部可追踪的履约触发。',
      objects: ['运营商与策划关系', '套餐标识与订购结果', '办理成功后的发放触发'],
      href: '',
      sectionHref: '#growth'
    },
    cel: {
      label: 'GROWTH / 04',
      title: '灵霄',
      description: '把运营商套餐配置为可推广产品，关联具体渠道，并通过三级策略控制办理边界。',
      change: '运营商、套餐、渠道与办理策略变化',
      decision: '限制逐层叠加，下层配置不能突破上层边界。',
      objects: ['运营商策划与套餐模板', '推广产品与合作方式', '运营商 / 套餐 / 渠道策略'],
      href: './prototypes/rights-management/cel/frontend/dist/index.html',
      sectionHref: '#growth'
    },
    channel: {
      label: 'ACQUISITION / 05',
      title: '推广渠道',
      description: '在授权范围内触达目标用户并提交套餐办理请求，受渠道身份、额度、时间和人群规则约束。',
      change: '渠道身份、额度、时段与目标人群变化',
      decision: '把渠道差异收束为可配置、可解释的办理边界。',
      objects: ['渠道身份与 AppId', '推广产品关系', '办理额度、时段与黑名单'],
      href: '',
      sectionHref: '#growth'
    },
    user: {
      label: 'EXPERIENCE / 06',
      title: '用户触点',
      description: '将复杂权益配置翻译为领取、选择、兑换和结果查看，让用户只面对清晰的下一步操作。',
      change: '领取方式、交付载体与结果状态变化',
      decision: '后台规则越复杂，前台越要只呈现当前可执行动作。',
      objects: ['订单与权益列表', '手动领取与 N 选 M', '券码、二维码、直充与结果状态'],
      href: '',
      sectionHref: '#experience'
    }
  };

  function initDialogs() {
    document.querySelectorAll('[data-open-dialog]').forEach((button) => {
      button.addEventListener('click', () => {
        const dialog = document.getElementById(button.dataset.openDialog);
        if (!(dialog instanceof HTMLDialogElement)) return;
        dialogScrollPosition = window.scrollY;
        dialog.showModal();
      }, { signal });
    });

    document.querySelectorAll('.tc-dialog').forEach((dialog) => {
      dialog.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog.close(), { signal });
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
      }, { signal });
      dialog.addEventListener('close', () => {
        window.scrollTo({ top: dialogScrollPosition, behavior: 'instant' });
      }, { signal });
    });
  }

  function initAtlas() {
    const nodes = [...document.querySelectorAll('.tc-atlas-node')];
    const label = document.getElementById('atlas-label');
    const title = document.getElementById('atlas-title');
    const description = document.getElementById('atlas-description');
    const change = document.getElementById('atlas-change');
    const decision = document.getElementById('atlas-decision');
    const list = document.getElementById('atlas-objects');
    const link = document.getElementById('atlas-evidence-link');
    const sectionLink = document.getElementById('atlas-section-link');
    if (!nodes.length || !label || !title || !description || !change || !decision || !list || !link || !sectionLink) return;

    nodes.forEach((node) => {
      node.addEventListener('click', () => {
        const content = atlasContent[node.dataset.node];
        if (!content) return;
        nodes.forEach((item) => item.setAttribute('aria-pressed', String(item === node)));
        label.textContent = content.label;
        title.textContent = content.title;
        description.textContent = content.description;
        change.textContent = content.change;
        decision.textContent = content.decision;
        list.replaceChildren(...content.objects.map((item) => {
          const li = document.createElement('li');
          li.textContent = item;
          return li;
        }));
        link.hidden = !content.href;
        if (content.href) link.href = content.href;
        sectionLink.href = content.sectionHref;
      }, { signal });
    });
  }

  function initSupplierLab() {
    const buttons = [...document.querySelectorAll('[data-supplier-mode]')];
    const supplierA = document.querySelector('[data-supplier="a"]');
    const supplierB = document.querySelector('[data-supplier="b"]');
    const route = document.getElementById('supplier-route');
    if (!buttons.length || !supplierA || !supplierB || !route) return;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const fallback = button.dataset.supplierMode === 'fallback';
        buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        supplierA.dataset.active = String(!fallback);
        supplierB.dataset.active = String(fallback);
        supplierA.dataset.state = fallback ? 'error' : 'normal';
        supplierA.lastElementChild.textContent = fallback ? '供货异常' : '正常供货';
        supplierB.lastElementChild.textContent = fallback ? '接管调用' : '备用供货';
        route.textContent = '当前调用：供应商 ' + (fallback ? 'B' : 'A');
      }, { signal });
    });
  }

  function getRoutingAllocation(amount, mode) {
    if (mode === 'priority') {
      const a = Math.min(amount, 12);
      const b = Math.min(Math.max(amount - a, 0), 10);
      return [a, b, Math.max(amount - a - b, 0)];
    }
    const a = Math.round(amount * 0.5);
    const b = Math.round(amount * 0.3);
    return [a, b, amount - a - b];
  }

  function initInventoryLab() {
    const buttons = [...document.querySelectorAll('[data-routing-mode]')];
    const amountInput = document.querySelector('[data-routing-amount]');
    const output = document.querySelector('[data-routing-output]');
    const summary = document.getElementById('inventory-summary');
    if (!buttons.length || !amountInput || !output || !summary) return;
    let mode = 'priority';

    const render = () => {
      const amount = Number(amountInput.value);
      const allocation = getRoutingAllocation(amount, mode);
      ['a', 'b', 'c'].forEach((key, index) => {
        const value = allocation[index];
        const fill = document.querySelector('[data-route-fill="' + key + '"]');
        const count = document.querySelector('[data-route-value="' + key + '"]');
        if (fill) fill.style.height = Math.max(4, (value / 30) * 100) + '%';
        if (count) count.textContent = String(value);
      });
      output.value = String(amount);
      summary.textContent = '发放 ' + amount + ' 份 · ' + (mode === 'priority' ? '优先级调用' : '穿插调用');
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        mode = button.dataset.routingMode;
        buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        render();
      }, { signal });
    });
    amountInput.addEventListener('input', render, { signal });
    render();
  }

  function initPolicyLab() {
    const checks = [...document.querySelectorAll('[data-policy-check]')];
    const result = document.querySelector('[data-policy-result]');
    if (!checks.length || !result) return;

    const render = () => {
      const allowed = checks.every((check) => check.checked);
      result.dataset.allowed = String(allowed);
      result.querySelector('strong').textContent = allowed ? '允许办理' : '禁止办理';
      const failed = checks.filter((check) => !check.checked).map((check) => check.nextElementSibling.textContent);
      result.querySelector('span').textContent = allowed ? '三级策略共同判断' : '未通过：' + failed.join('、');
    };

    checks.forEach((check) => check.addEventListener('change', render, { signal }));
  }

  function initClaimPreview() {
    const shape = document.querySelector('[data-claim-shape]');
    const mode = document.querySelector('[data-claim-mode]');
    const delivery = document.querySelector('[data-claim-delivery]');
    const status = document.querySelector('[data-claim-status]');
    const title = document.querySelector('[data-claim-title]');
    const copy = document.querySelector('[data-claim-copy]');
    const action = document.querySelector('[data-claim-action]');
    if (!shape || !mode || !delivery || !status || !title || !copy || !action) return;

    const render = () => {
      title.textContent = shape.value === 'bundle' ? '联合会员权益包' : '腾讯视频月卡';
      if (mode.value === 'choice') {
        status.textContent = 'WAITING FOR SELECTION';
        copy.textContent = '可从权益包中选择指定数量的权益，确认后进入发放流程。';
        action.textContent = '去选择';
        return;
      }
      if (mode.value === 'auto') {
        status.textContent = 'DELIVERY IN PROGRESS';
        copy.textContent = delivery.value === 'direct' ? '权益正在自动充值到办理手机号，无需再次操作。' : '权益已自动下发，可在详情中查看兑换信息。';
        action.textContent = '查看结果';
        return;
      }
      status.textContent = 'WAITING FOR CLAIM';
      const copyMap = {
        direct: '确认充值手机号后领取，到账结果将在当前页面更新。',
        code: '领取后展示券码与复制操作，并保留使用状态。',
        qr: '领取后展示二维码，可在有效期内完成核销。'
      };
      copy.textContent = copyMap[delivery.value];
      action.textContent = '去领取';
    };

    [shape, mode, delivery].forEach((select) => select.addEventListener('change', render, { signal }));
    render();
  }

  function setJourneyState(activeIndex) {
    const steps = [...document.querySelectorAll('.tc-journey__step')];
    steps.forEach((step, index) => {
      step.classList.toggle('is-complete', activeIndex >= steps.length || index < activeIndex);
      step.classList.toggle('is-active', index === activeIndex);
    });
    return steps;
  }

  function initJourney() {
    const button = document.querySelector('[data-journey-play]');
    const status = document.getElementById('journey-status');
    if (!button || !status) return;

    if (reducedMotion.matches) {
      setJourneyState(Number.POSITIVE_INFINITY);
      status.textContent = '已显示完整静态链路';
      button.textContent = '完整链路';
      button.disabled = true;
      return;
    }

    button.addEventListener('click', () => {
      window.clearInterval(journeyTimer);
      let index = 0;
      const steps = setJourneyState(index);
      button.textContent = '重新播放';
      status.textContent = '步骤 1 / ' + steps.length + ' · ' + steps[0].querySelector('h3').textContent;

      journeyTimer = window.setInterval(() => {
        index += 1;
        setJourneyState(index);
        if (index >= steps.length) {
          window.clearInterval(journeyTimer);
          status.textContent = '链路完成 · 用户已看到履约结果';
          return;
        }
        status.textContent = '步骤 ' + (index + 1) + ' / ' + steps.length + ' · ' + steps[index].querySelector('h3').textContent;
      }, 520);
    }, { signal });
  }

  initDialogs();
  initAtlas();
  initSupplierLab();
  initInventoryLab();
  initPolicyLab();
  initClaimPreview();
  initJourney();

  window.addEventListener('pagehide', () => {
    window.clearInterval(journeyTimer);
    controller.abort();
  }, { once: true });
})();
