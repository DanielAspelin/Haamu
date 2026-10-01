'use strict';

/**
 * Haamu Browser — four-corner / four-pane visual projection.
 * Center is intentionally unoccupied.
 */
globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser'] = Object.freeze({
  family: 'browser',
  role: 'browser',
  version: '0.121.2',
  position: 'between-browser-entry-and-web-entry',
});

globalThis.HaamuIngress ??= [];
globalThis.HaamuIngress.push('browser');

const HaamuLayout = Object.freeze({
  version: '0.7.0',
  center: 'empty',
  corners: Object.freeze({
    topLeft: Object.freeze({ role: 'start', color: 'neon-green' }),
    topRight: Object.freeze({ role: 'start', color: 'lemon-yellow' }),
    bottomLeft: Object.freeze({ role: 'start', color: 'purple' }),
    bottomRight: Object.freeze({ role: 'start', color: 'orange' }),
  }),
  panes: Object.freeze(['top-center', 'left-middle', 'right-middle', 'bottom-center']),
});

globalThis.HaamuLayout = HaamuLayout;

function projectHaamuBrowser(root = document.getElementById('haamu-root')) {
  if (!root) throw new Error('Haamu visual root not found.');

  // Phase 1 is deliberately geometry-only: remove every prior projection.
  root.replaceChildren();
  const shell = document.createElement('main');
  shell.className = 'haamu-interface';
  const mobilePlatform = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  shell.classList.add(mobilePlatform ? 'haamu-mobile' : 'haamu-desktop');
  shell.setAttribute('aria-label', 'Haamu interface');

  // First projected layer after the shell background: centered identity text.
  // Controls and plates remain on their higher established z-index layers.
  const wordmarkLayer = document.createElement('div');
  wordmarkLayer.className = 'haamu-wordmark-layer';
  wordmarkLayer.setAttribute('aria-hidden', 'true');
  const wordmark = document.createElement('div');
  wordmark.className = 'haamu-wordmark';
  wordmark.textContent = 'HAAMU';
  wordmarkLayer.appendChild(wordmark);
  shell.appendChild(wordmarkLayer);

  const positions = [
    ['top-left', 'corner start neon-green', 'Start control, top left'],
    ['top-center', 'pane top-pane', 'Top pane'],
    ['top-right', 'corner start lemon-yellow', 'Start control, top right'],
    ['left-middle', 'pane left-pane', 'Left pane'],
    ['center', 'center', ''],
    ['right-middle', 'pane right-pane', 'Right pane'],
    ['bottom-left', 'corner start purple', 'Start control, bottom left'],
    ['bottom-center', 'pane bottom-pane', 'Bottom pane'],
    ['bottom-right', 'corner start orange', 'Start control, bottom right'],
  ];

  for (const [position, classes, label] of positions) {
    const element = classes.includes('start')
      ? document.createElement('button')
      : document.createElement('section');
    element.className = classes;
    element.dataset.position = position;
    if (classes.includes('start')) {
      element.dataset.snap = position;
    }
    if (label) element.setAttribute('aria-label', label);
    if (classes.includes('start')) element.type = 'button';
    shell.appendChild(element);
  }

  /*
   * Plate layer is constructed before the control layer is promoted.
   * This is a real projection layer, not only a z-index convention.
   */
  const plateLayer = document.createElement('div');
  plateLayer.className = 'plate-layer';
  plateLayer.setAttribute('aria-label', 'Haamu plates');
  shell.prepend(plateLayer);

  const menus = new Map();
  const logicalPrompts = new Map();
  const plateTitles = Object.freeze({
    'top-left': 'SERVER',
    'top-right': 'LOCAL',
    'bottom-left': 'GLOBAL',
    'bottom-right': 'CLIENT',
  });
  for (const button of shell.querySelectorAll('.corner.start')) {
    const corner = button.dataset.position;
    const promptId = 'prompt-' + corner;
    const plateId = 'plate-' + corner;
    const channelId = 'command-' + corner;
    const shellByCorner = Object.freeze({
      'top-left':'server',
      'top-right':'local',
      'bottom-left':'global',
      'bottom-right':'client',
    });
    const promptSystems = globalThis.HaamuBrowserPromptSystems?.forPrompt(promptId, {
      channelId,
      shell: shellByCorner[corner],
    });
    const plateSystems = globalThis.HaamuBrowserPlateSystems?.forPlate(plateId, { channelId });
    const windowing = globalThis.HaamuBrowserWindowing?.forPlate(plateId);
    const plateState = globalThis.HaamuBrowserPlateState?.forPlate(plateId);
    const webPlate = globalThis.HaamuWebPlate?.create?.({ id:plateId, corner, platform:'common' });
    const commandChannel = globalThis.HaamuCommandChannel?.get?.(channelId);
    commandChannel?.bindOutput?.(plateId);
    const shellRouter = globalThis.HaamuShell?.router?.();
    const projections = Object.create(null);

    for (const platform of ['mobile', 'desktop']) {
      const menu = document.createElement('section');
      menu.className = 'corner-menu';
      menu.dataset.corner = corner;
      menu.dataset.platform = platform;
      menu.dataset.prompt = promptId;
      menu.dataset.plate = plateId;
      menu.dataset.channel = channelId;
      menu.setAttribute('aria-hidden', 'true');
      menu.dataset.plateState = platform === 'mobile' ? 'automatic' : (plateState?.state('desktop') ?? 'normal');

      if (platform === 'desktop') {
        const stateSystem = plateState ?? globalThis.HaamuBrowserPlateState?.forPlate(plateId);
        const control = document.createElement('button');
        control.type = 'button';
        control.className = 'plate-state-toggle';
        control.dataset.action = 'toggle-maximize';
        control.setAttribute('aria-label', 'Maximize ' + plateTitles[corner] + ' Plate');
        control.setAttribute('aria-pressed', 'false');
        control.textContent = '□';
        control.addEventListener('click', event => {
          event.stopPropagation();
          stateSystem?.toggle('desktop');
        });
        menu.appendChild(control);
      }

      const matrix = document.createElement('div');
      matrix.className = 'plate-matrix';
      matrix.dataset.matrix = platform + '-' + corner;

      const table = document.createElement('div');
      table.className = 'plate-table';
      table.setAttribute('role', 'table');

      const contentRow = document.createElement('div');
      contentRow.className = 'plate-row plate-content-row';
      contentRow.setAttribute('role', 'row');
      const contentRegion = document.createElement('div');
      contentRegion.className = 'plate-content-region';
      contentRegion.setAttribute('role', 'cell');
      contentRegion.setAttribute('aria-live', 'polite');
      contentRegion.dataset.logicalPlate = plateId;
      contentRegion.dataset.channel = channelId;
      contentRow.appendChild(contentRegion);

      const promptRow = document.createElement('div');
      promptRow.className = 'plate-row plate-prompt-row';
      promptRow.setAttribute('role', 'row');

      const prompt = document.createElement('textarea');
      prompt.className = 'plate-prompt';
      prompt.rows = 1;
      prompt.setAttribute('rows', '1');
      prompt.placeholder = plateTitles[corner];
      prompt.setAttribute('placeholder', plateTitles[corner]);
      prompt.autocomplete = 'off';
      prompt.spellcheck = false;
      prompt.setAttribute('spellcheck', 'false');
      prompt.setAttribute('autocorrect', 'off');
      prompt.setAttribute('autocapitalize', 'off');
      prompt.setAttribute('data-gramm', 'false');
      prompt.setAttribute('data-gramm_editor', 'false');
      prompt.setAttribute('data-enable-grammarly', 'false');
      /* Android/Chrome IMEs may render composition decoration independently
         of CSS. Keep composition native for caret correctness, but force the
         editable surface to reassert undecorated text after composition. */
      prompt.addEventListener('compositionstart', () => {
        prompt.dataset.composing = 'true';
      });
      prompt.addEventListener('compositionend', () => {
        delete prompt.dataset.composing;
        const start = prompt.selectionStart;
        const end = prompt.selectionEnd;
        const value = prompt.value;
        prompt.value = value;
        if (start !== null && end !== null) prompt.setSelectionRange(start, end);
        prompt.dispatchEvent(new Event('input', { bubbles:true }));
      });
      prompt.setAttribute('aria-label', plateTitles[corner] + ' prompt');
      prompt.dataset.logicalPrompt = promptId;
      const resizePrompt = target => {
        const menu=target.closest('.corner-menu'), wrap=target.closest('.plate-prompt-wrap');
        const row=target.closest('.plate-prompt-row'), area=wrap?.querySelector('.plate-prompt-text-area');
        const field=area?.querySelector('.plate-prompt-text-field'), mirror=wrap?.querySelector('.plate-prompt-measure');
        const caret=area?.querySelector('.plate-prompt-caret');
        if(!area||!field||!mirror)return;
        const style=getComputedStyle(target), lineHeight=parseFloat(style.lineHeight)||17;
        const paddingTop=parseFloat(style.paddingTop)||0, paddingBottom=parseFloat(style.paddingBottom)||0;
        const oneLine=44, maxLines=3;
        mirror.style.width=target.clientWidth+'px';
        mirror.textContent=target.value||'\u200b';
        const node=mirror.firstChild, text=target.value, lines=[];
        if(node?.nodeType===Node.TEXT_NODE){
          const range=document.createRange(); let active=null;
          for(let i=0;i<Math.max(1,text.length);i+=1){
            if(!text.length){lines.push({top:0,start:0,end:0});break;}
            range.setStart(node,i); range.setEnd(node,i+1);
            const rect=range.getBoundingClientRect(); if(!rect.height)continue;
            if(!active||Math.abs(rect.top-active.top)>1){active={top:rect.top,start:i,end:i+1};lines.push(active);}
            else active.end=i+1;
          }
          range.detach?.();
        }
        if(!lines.length)lines.push({top:0,start:0,end:0});
        const selection=Math.max(0,Math.min(text.length,target.selectionStart??text.length));
        let caretLine=Math.max(0,lines.findIndex(line=>selection>=line.start&&selection<=line.end));
        if(caretLine<0)caretLine=lines.length-1;
        const firstVisible=Math.max(0,Math.min(caretLine,lines.length-maxLines));
        const visible=lines.slice(firstVisible,firstVisible+maxLines);
        field.replaceChildren();
        for(const line of visible){
          const lineNode=document.createElement('div');
          lineNode.className='plate-prompt-projection-line';
          const beforeEnd=Math.max(line.start,Math.min(selection,line.end));
          if(caretLine===lines.indexOf(line)){
            const before=document.createTextNode(text.slice(line.start,beforeEnd).replace(/\n$/,''));
            const after=document.createTextNode(text.slice(beforeEnd,line.end).replace(/\n$/,''));
            lineNode.append(before,caret,after);
          }else lineNode.textContent=text.slice(line.start,line.end).replace(/\n$/,'');
          field.appendChild(lineNode);
        }
        const visibleCount=Math.min(maxLines,Math.max(1,lines.length));
        const height=Math.max(oneLine,Math.ceil(paddingTop+paddingBottom+visibleCount*lineHeight));
        target.style.height=height+'px'; target.style.overflowY='hidden';
        wrap.style.height=height+'px'; row.style.height=height+'px'; row.style.minHeight=height+'px';
        menu?.style.setProperty('--prompt-track-height',height+'px');
        area.style.height=height+'px'; field.style.height=(visibleCount*lineHeight)+'px';
        area.classList.toggle('is-empty',!text);
        area.dataset.lineCount=String(lines.length); area.dataset.visibleLines=String(visibleCount);
        area.dataset.firstVisibleLine=String(firstVisible);
        caret.hidden=document.activeElement!==target||target.selectionStart!==target.selectionEnd;
      };
      prompt.addEventListener('focus', () => {
        prompt.closest('.plate-prompt-wrap')?.classList.add('is-focused');
        resizePrompt(prompt);
      });
      prompt.addEventListener('blur', () => {
        prompt.closest('.plate-prompt-wrap')?.classList.remove('is-focused');
      });
      const synchronizePrompt = target => {
        logicalPrompts.set(promptId, target.value);
        resizePrompt(target);
        for (const peer of plateLayer.querySelectorAll('[data-logical-prompt="' + promptId + '"]')) {
          if (peer === target) continue;
          peer.value = target.value;
          resizePrompt(peer);
        }
      };
      prompt.addEventListener('input', () => synchronizePrompt(prompt));
      /* Selection is independent from value mutation. Re-project on native
         caret/selection movement so the visual Text Field can subsequently
         consume the browser's authoritative insertion index without changing
         Prompt geometry or text state. */
      const synchronizeSelection = () => {
        prompt.dataset.selectionStart = String(prompt.selectionStart ?? 0);
        prompt.dataset.selectionEnd = String(prompt.selectionEnd ?? 0);
        prompt.dataset.selectionDirection = prompt.selectionDirection || 'none';
        resizePrompt(prompt);
      };
      prompt.addEventListener('select', synchronizeSelection);
      prompt.addEventListener('keyup', synchronizeSelection);
      prompt.addEventListener('pointerup', synchronizeSelection);


      const promptWrap = document.createElement('div');
      promptWrap.className = 'plate-prompt-wrap';
      const promptProjection = document.createElement('div');
      promptProjection.className = 'plate-prompt-projection plate-prompt-text-area is-empty';
      promptProjection.setAttribute('aria-hidden', 'true');
      const promptTextField = document.createElement('div');
      promptTextField.className = 'plate-prompt-text-field';
      promptProjection.appendChild(promptTextField);
      const promptCaret = document.createElement('span');
      promptCaret.className = 'plate-prompt-caret';
      promptCaret.setAttribute('aria-hidden','true');
      promptCaret.hidden = true;
      const promptMeasure = document.createElement('div');
      promptMeasure.className = 'plate-prompt-measure';
      promptMeasure.setAttribute('aria-hidden', 'true');
      const promptLabel = document.createElement('span');
      promptLabel.className = 'plate-prompt-label';
      promptLabel.textContent = plateTitles[corner];
      /* Inline projection is intentional: this label is runtime-generated,
         and the punch-through treatment must survive stale/overridden CSS. */
      promptLabel.style.cssText = [
        'display:block','visibility:visible','opacity:1',
        'color:rgba(0,0,0,.78)','-webkit-text-fill-color:rgba(0,0,0,.78)',
        '-webkit-text-stroke:0','text-shadow:0 1px 0 rgba(255,255,255,.32)',
        'mix-blend-mode:normal'
      ].join(';');
      promptWrap.appendChild(promptMeasure);
      promptWrap.appendChild(promptProjection);
      promptWrap.appendChild(prompt);
      promptWrap.appendChild(promptLabel);
      prompt.addEventListener('input', () => {
        promptWrap.classList.toggle('has-value', prompt.value.length > 0);
      });
      prompt.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' || event.isComposing) return;
        event.preventDefault();

        if (!promptSystems || !plateSystems) return;
        const transaction = promptSystems.submit(prompt.value, {
          router: shellRouter,
          promptId,
          plateId,
          channelId,
          corner,
          platform,
        });
        const projectedOutput = plateSystems.accept(transaction.output);
        if (webPlate && globalThis.HaamuBrowserPlateText?.project) {
          for (const target of plateLayer.querySelectorAll('[data-logical-plate="' + plateId + '"]')) {
            HaamuBrowserPlateText.project(transaction.output, webPlate, target);
          }
        }

        globalThis.dispatchEvent(new CustomEvent('haamu:command-output', {
          detail: Object.freeze({ transaction, output: projectedOutput, promptId, plateId, channelId }),
        }));
        if (transaction.output?.type === 'terminal-output') {
          globalThis.dispatchEvent(new CustomEvent('haamu:terminal-output', {
            detail: transaction.output,
          }));
        }
        prompt.value = '';
        prompt.setSelectionRange(0,0);
        resizePrompt(prompt);
        logicalPrompts.set(promptId, '');
        promptWrap.classList.remove('has-value');
        for (const peer of plateLayer.querySelectorAll('[data-logical-prompt="' + promptId + '"]')) {
          peer.value = '';
          peer.setSelectionRange?.(0,0);
          resizePrompt(peer);
          peer.closest('.plate-prompt-wrap')?.classList.remove('has-value');
        }
      });
      promptRow.appendChild(promptWrap);
      table.appendChild(contentRow);
      table.appendChild(promptRow);
      matrix.appendChild(table);
      menu.appendChild(matrix);
      plateLayer.appendChild(menu);
      projections[platform] = menu;
    }

    const activePlateState = plateState ?? globalThis.HaamuBrowserPlateState?.forPlate(plateId);
    if (activePlateState) {
      activePlateState.subscribe(snapshot => {
        projections.mobile.dataset.plateState = 'automatic';
        projections.desktop.dataset.plateState = snapshot.desktop;
        const toggle = projections.desktop.querySelector('.plate-state-toggle');
        if (toggle) {
          const maximized = snapshot.desktop === 'maximized';
          toggle.setAttribute('aria-pressed', String(maximized));
          toggle.setAttribute('aria-label', (maximized ? 'Restore ' : 'Maximize ') + plateTitles[corner] + ' Plate');
          toggle.textContent = maximized ? '↺' : '□';
        }
      });
    }
    projections.stateSystem = activePlateState ?? plateState ?? null;
    menus.set(corner, projections);
    button.setAttribute('aria-expanded', 'false');
    let buttonMorph = null;
    let buttonMorphTimers = [];
    button.addEventListener('click', () => {
      buttonMorph?.cancel();
      buttonMorphTimers.forEach(clearTimeout);
      buttonMorphTimers = [];

      const rgb = getComputedStyle(button).getPropertyValue('--corner-rgb').trim();
      const paint = (background, brightness, scale) => {
        button.style.backgroundColor = background;
        button.style.filter = 'brightness(' + brightness + ')';
        button.style.transform = 'scale(' + scale + ')';
      };

      paint('rgba(' + rgb + ', .32)', .52, .90);
      buttonMorphTimers.push(setTimeout(() => {
        paint('rgba(' + rgb + ', 1)', 1.65, 1.06);
      }, 260));
      buttonMorphTimers.push(setTimeout(() => {
        button.style.backgroundColor = '';
        button.style.filter = '';
        button.style.transform = '';
      }, 620));

      const activePlatform = mobilePlatform ? 'mobile' : 'desktop';
      const targetPosition = button.dataset.position;
      const current = [...menus.entries()].find(([, pair]) =>
        [pair.mobile, pair.desktop].some(candidate => candidate?.classList.contains('open')));
      const same = current && current[0] === targetPosition;

      const openTargetNow = () => {
        if (same) return;
        const menu = projections[activePlatform];
        projections.stateSystem?.restore('desktop');
        menu.setAttribute('aria-hidden', 'false');
        button.setAttribute('aria-expanded', 'true');
        /* Force the closed geometry to be committed before applying .open.
           This gives the browser a real start state while still beginning the
           incoming and outgoing transitions in the same interaction turn. */
        void menu.offsetWidth;
        /* Commit the closed Plate as one rendered frame, then begin expansion
           on the very next frame. Outgoing contraction has already started in
           this same interaction turn, so the animations remain concurrent. */
        requestAnimationFrame(() => {
          menu.classList.add('open', 'plate-transition-in');
          setTimeout(() => menu.classList.remove('plate-transition-in'), 520);
        });
      };

      if (!current) {
        openTargetNow();
        return;
      }

      const [position, pair] = current;
      const activeCurrent = pair[activePlatform];
      const closingState = pair.stateSystem ?? null;
      const wasMaximized = activePlatform === 'desktop'
        && pair.desktop?.dataset.plateState === 'maximized';

      /* Same-turn concurrent handoff. There is deliberately no rAF or delay
         between starting the outgoing contraction and incoming expansion. */
      closingState?.restore('desktop');
      if (wasMaximized) activeCurrent?.classList.add('plate-restoring');
      activeCurrent?.classList.add('plate-transition-out');
      if (!same) openTargetNow();

      setTimeout(() => {
        for (const active of [pair.mobile, pair.desktop]) {
          active?.classList.remove('open', 'plate-restoring', 'plate-transition-out');
          active?.setAttribute('aria-hidden', 'true');
        }
        shell.querySelector('.corner.start[data-position="' + position + '"]')
          ?.setAttribute('aria-expanded', 'false');
      }, wasMaximized ? 500 : 360);
    });
  }

  shell.addEventListener('click', (event) => {
    if (event.target.closest('.corner.start') || event.target.closest('.corner-menu')) return;

    for (const [position, pair] of menus.entries()) {
      const open = [pair.mobile, pair.desktop].filter(active => active?.classList.contains('open'));
      if (!open.length) continue;
      const desktop = pair.desktop;
      const plateState = pair.stateSystem ?? null;
      if (desktop?.dataset.plateState === 'maximized') {
        desktop.classList.add('plate-restoring');
      }
      plateState?.restore('desktop');
      for (const active of open) {
        active.classList.remove('open');
        active.setAttribute('aria-hidden', 'true');
      }
      shell.querySelector('.corner.start[data-position="' + position + '"]')?.setAttribute('aria-expanded', 'false');
    }
  });

  root.appendChild(shell);
  document.documentElement.dataset.haamu = 'ready';
  return Object.freeze({
    state: 'READY',
    layout: HaamuLayout.version,
    corners: 4,
    panes: 4,
    center: 'empty',
    cornerMenus: 8,
    matrices: 8,
    tables: 8,
    logicalPrompts: 4,
  });
}

globalThis.projectHaamuBrowser = projectHaamuBrowser;
