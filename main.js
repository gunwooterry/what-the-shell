$(document).ready(() => {
  let root = {
    type: 'folder',
    name: 'root',
    path: 'root/',
    children: [
      {
        type: 'folder',
        name: 'aaa',
        path: 'root/aaa/',
        children: [
          {
            type: 'folder',
            name: 'ccc',
            path: 'root/aaa/ccc/',
            children: []
          },
          {
            type: 'file',
            name: 'hello.c',
            path: 'root/aaa/hello.c',
          },
          {
            type: 'file',
            name: 'hi.txt',
            path: 'root/aaa/hi.txt',
          },
        ],
      },
      {
        type: 'folder',
        name: 'bbb',
        path: 'root/bbb/',
        children: [
          {
            type: 'file',
            name: 'trash.txt',
            path: 'root/bbb/trash.txt',
          },
        ],
      },
      {
        type: 'file',
        name: 'README.md',
        path: 'root/README.md',
        children: [],
      },
    ],
  };

  let current = root;
  const sidebar = document.getElementById('sidebar');
  const finder = document.getElementById('finder');
  sidebar.appendChild(renderHierarchy(root));
  renderFinder(current);

  const arrowBtn = document.getElementById('arrow_btn');
  arrowBtn.onmouseover = function() {
    if (currentMode == 'GUI') resizeArrows(arrowSmallHover, arrowBigHover);
    else resizeArrows(arrowBigHover, arrowSmallHover);
  };
  arrowBtn.onmouseout = function() {
    if (currentMode == 'GUI') resizeArrows(arrowSmall, arrowBig);
    else resizeArrows(arrowBig, arrowSmall);
  };
})

const arrowBig = 4;
const arrowSmall = 1;
const arrowBigHover = 3.5;
const arrowSmallHover = 2;

let currentMode = 'GUI';
let historyCount = 0;

function resizeArrows(left, right) {
  const leftArrow = document.getElementById('arrow_left_icon');
  const rightArrow = document.getElementById('arrow_right_icon');
  leftArrow.style.fontSize = `${left}em`;
  rightArrow.style.fontSize = `${right}em`;
}

function changeModeListener(clicked) {
  function emphasize(target) {
    target.style.boxShadow = 'inset 0 3px 8px rgba(0, 0, 0, 0.24)';
    target.style.backgroundColor = '#fcfcfc';
  }
  function deemphasize(target) {
    target.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0)';
    target.style.backgroundColor = '#ffffff';
  }

  const guiWindow = document.getElementById('gui_window');
  const cuiCommandline = document.getElementById('cui_commandline');

  const btnToCUI = clicked == 'arrow_btn' && currentMode == 'GUI';
  const btnToGUI = clicked == 'arrow_btn' && currentMode == 'CUI';
  const clickedCUI = clicked == 'cui_commandline';
  const clickedGUI = clicked == 'gui_window'

  if (btnToCUI || clickedCUI) {
    cuiCommandline.placeholder = '';
    cuiCommandline.focus();
    emphasize(cuiCommandline);
    deemphasize(guiWindow);
    if (btnToCUI) resizeArrows(arrowBigHover, arrowSmallHover);
    else resizeArrows(arrowBig, arrowSmall);
    currentMode = 'CUI';
  } else if (btnToGUI || clickedGUI) {
    cui_commandline.value = '';
    cui_commandline.placeholder='Type your command here';
    emphasize(guiWindow);
    deemphasize(cuiCommandline);
    if (btnToGUI) resizeArrows(arrowSmallHover, arrowBigHover);
    else resizeArrows(arrowSmall, arrowBig);
    currentMode = 'GUI';
  }
}

function renderHierarchy(current) {
  const currentDir = document.createElement('div');
  currentDir.classList.add('ui', 'accordion');
  current.children.forEach(child => {
    const { type, name } = child
    if (type === 'folder') {
      const title = document.createElement('div');
      const dropdown = document.createElement('i');
      const icon = document.createElement('i');
      const nameText = document.createTextNode(name);

      title.classList.add('title');
      dropdown.classList.add('dropdown', 'icon');
      icon.classList.add('folder', 'icon');
      title.appendChild(dropdown);
      title.appendChild(icon);
      title.appendChild(nameText);
      currentDir.appendChild(title);

      const content = document.createElement('div');
      content.classList.add('content');
      content.style.marginTop = '-1em';
      content.style.padding = '0 0 0 1em';
      content.appendChild(renderHierarchy(child));
      currentDir.appendChild(content);

      title.onclick = function() {
        title.classList.toggle('active');
        content.classList.toggle('active');
      }
    }
  });

  return currentDir;
}

function renderFinder(current) {
}

function addCommand(command) {
  const tag = `<div id="command_${historyCount}" class="command">` + command +
              '<i id="m_button" class="help icon"' +
              'style="float:right;" onclick="showManual()"></i></div>';
  const $history = $('#history');
  $history.append(tag);
  $history.scrollTop($history[0].scrollHeight);
  const $addedCommand = $(`#command_${historyCount}`);
  // TODO: Reformat to callback, decide what 'ease' is
  $addedCommand.animate({backgroundColor: '#aa0000'}, 500);
  $addedCommand.animate({backgroundColor: '#ffffff'}, 500);
  historyCount += 1;
}

function commandInput(e) {
    if (currentMode == 'CUI' && e.keyCode == 13) {
      const commandLine = document.getElementById('cui_commandline');
      const command = commandLine.value;
      if (command) addCommand(command);
      commandLine.value = '';
    }
}

function showManual() {
  document.getElementById('manual').style.visibility = 'visible';
}

function hideManual() {
  document.getElementById('manual').style.visibility = 'hidden';
}
