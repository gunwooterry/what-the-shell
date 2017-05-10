const $document = $(document);
var modal_on = 0;
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
          content: '#include <stdio.h> \n int main(){ \n printf("hello, world!"); \n}',
        },
        {
          type: 'file',
          name: 'hi.txt',
          path: 'root/aaa/hi.txt',
          content: 'hi hello bonjour',
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
      content: 'whattheshell mid-fi prototype',
    },
  ],
};
let current = root;
let selectedObj = root;

$document.ready(() => {

  const sidebar = document.getElementById('sidebar');
  const arrowBtn = document.getElementById('arrow_btn');
  const ctxMenu = document.getElementById('ctxMenu');
  const popup_hierarchy = document.getElementById('hierarchy');
  const modal = document.getElementById('modal_popup');

  resizeArrows(arrowSmall, arrowBig);
  popup_hierarchy.appendChild(renderModalHierarchy(root));
  sidebar.appendChild(renderHierarchy(root));
  renderFinder(current);
  renderBreadcrumb(current);

  arrowBtn.onmouseover = function() {
    if (currentMode == 'GUI') resizeArrows(arrowSmallHover, arrowBigHover);
    else resizeArrows(arrowBigHover, arrowSmallHover);
  };

  arrowBtn.onmouseout = function() {
    if (currentMode == 'GUI') resizeArrows(arrowSmall, arrowBig);
    else resizeArrows(arrowBig, arrowSmall);
  };

  $document.on('contextmenu', '.non_modal_title', function(event) {
    event.preventDefault();
    ctxMenu.style.display = 'inline-block';
    ctxMenu.style.left = `${event.pageX}px`;
    ctxMenu.style.top = `${event.pageY}px`;
  });

  $document.on('contextmenu', '#modal_popup', function(event) {
    event.preventDefault();
  });


  $document.on('contextmenu', '.unit', function(event) {
    event.preventDefault();
    let targetName = event.currentTarget.id;
    selectedObj = findByChildName(current, targetName);
    ctxMenu.style.display = 'inline-block';
    ctxMenu.style.left = `${event.pageX}px`;
    ctxMenu.style.top = `${event.pageY}px`;
  });


  $document.on('click', function(event) {
    ctxMenu.style.display = '';
    ctxMenu.style.left = '';
    ctxMenu.style.top = '';
    if(modal_on == 1) {
      $('#modal_popup').hide();
      modal_on =0;
    }
  });

  $document.on('click', '.copy', function(event) {
    event.preventDefault();
    ctxMenu.style.display = '';
    if(modal_on == 0) {
      $('#modal_popup').show();
      modal_on = 1;
     }
     return false;
  });

  $document.on('click', '.modal_title', function(event) {
    event.preventDefault();
    console.log('fuck');
    event.target.backgroundColor = 'blue';
    return false;
  });


  $document.on('click', '.cut', function(event) {
    event.preventDefault();
    ctxMenu.style.display = '';
    if(modal_on == 0) {
      console.log("ddd");
      $('#modal_popup').show();
      modal_on = 1;
    }
    return false;
  });

  $document.on('click', '.delete', function(event) {
    event.preventDefault();
    handleDelete(selectedObj.name);
  });

  $('.modal_content').click(function(event) {
    event.preventDefault();
    return false;
  })

})

const arrowBig = 4;
const arrowSmall = 1;
const arrowBigHover = 3.5;
const arrowSmallHover = 2;

let currentMode = 'GUI';
let historyCount = 0;

function resizeArrows(left, right) {
  const arrowLeft = document.getElementById('arrow_left');
  const arrowRight = document.getElementById('arrow_right');
  arrowLeft.style.fontSize = `${left}em`;
  arrowRight.style.fontSize = `${right}em`;
}

function changeModeListener(clicked) {
  function emphasize(target) { target.classList.add('emphasized'); }
  function deemphasize(target) { target.classList.remove('emphasized') }

  const guiWindow = document.getElementById('gui_window');
  const commandLine = document.getElementById('command_line');

  const btnToCUI = clicked == 'arrow_btn' && currentMode == 'GUI';
  const btnToGUI = clicked == 'arrow_btn' && currentMode == 'CUI';
  const clickedCUI = clicked == 'command_line';
  const clickedGUI = clicked == 'gui_window'

  if (btnToCUI || clickedCUI) {
    commandLine.placeholder = '';
    commandLine.focus();
    emphasize(commandLine);
    deemphasize(guiWindow);
    if (btnToCUI) resizeArrows(arrowBigHover, arrowSmallHover);
    else resizeArrows(arrowBig, arrowSmall);
    currentMode = 'CUI';
  } else if (btnToGUI || clickedGUI) {
    commandLine.value = '';
    commandLine.placeholder='Type your command here';
    emphasize(guiWindow);
    deemphasize(commandLine);
    if (btnToGUI) resizeArrows(arrowSmallHover, arrowBigHover);
    else resizeArrows(arrowSmall, arrowBig);
    currentMode = 'GUI';
  }
}

function goto(here) {
  current = here;
  renderFinder(here);
  renderBreadcrumb(here);
}

function renderHierarchy(current) {
  const currentDir = document.createElement('div');
  currentDir.classList.add('ui', 'accordion');
  current.children.forEach(child => {
    const { type, name } = child
    if (type == 'folder') {
      const title = document.createElement('div');
      const dropdown = document.createElement('i');
      const icon = document.createElement('i');
      const nameText = document.createTextNode(name);

      title.classList.add('title', 'non_modal_title');
      dropdown.classList.add('dropdown', 'icon');
      icon.classList.add('folder', 'icon');
      title.appendChild(dropdown);
      title.appendChild(icon);
      title.appendChild(nameText);
      currentDir.appendChild(title);

      const content = document.createElement('div');
      content.className = 'content';
      content.style.marginTop = '-1em';
      content.style.padding = '0 0 0 1em';
      content.appendChild(renderHierarchy(child));
      currentDir.appendChild(content);

      icon.onclick = function() {
        goto(child);
        addCommand(`cd ${child.path}`);
      }
      dropdown.onclick = function() {
        title.classList.toggle('active');
        content.classList.toggle('active');
      }
    }
  });

  return currentDir;
}


function renderModalHierarchy(current) {
  const currentDir = document.createElement('div');
  currentDir.classList.add('ui', 'accordion');
  current.children.forEach(child => {
    const { type, name } = child
    if (type == 'folder') {
      const title = document.createElement('div');
      const dropdown = document.createElement('i');
      const icon = document.createElement('i');
      const nameText = document.createTextNode(name);

      title.classList.add('title', 'modal_title');
      dropdown.classList.add('dropdown', 'icon');
      icon.classList.add('folder', 'icon');
      title.appendChild(dropdown);
      title.appendChild(icon);
      title.appendChild(nameText);
      currentDir.appendChild(title);

      const content = document.createElement('div');
      content.className = 'content';
      content.style.marginTop = '-1em';
      content.style.padding = '0 0 0 1em';
      content.appendChild(renderModalHierarchy(child));
      currentDir.appendChild(content);

      dropdown.onclick = function() {
        title.classList.toggle('active');
        content.classList.toggle('active');
      }
    }
  });

  return currentDir;
}


function renderFinder(current) {
  const finder = document.getElementById('finder');
  const grid = document.createElement('div');
  grid.classList.add('ui', 'four', 'column', 'grid');
  current.children.forEach(child => {
    const { type, name } = child
    const column = document.createElement('div');
    const unit = document.createElement('div');
    const icon = document.createElement('i');
    const nameText = document.createTextNode(name);

    column.className = 'column';
    column.style.textAlign = 'center';
    unit.className = 'unit';
    unit.id = name;
    icon.style.margin = 0;
    if (type == 'folder') {
      icon.classList.add('huge', 'blue', 'folder', 'icon');
      unit.ondblclick = function () {
        goto(child);
        addCommand(`cd ${name}`);
      }
    }
    else if (type == 'file') icon.classList.add('huge', 'file', 'icon');

    unit.appendChild(icon);
    unit.appendChild(nameText);
    column.appendChild(unit);
    grid.appendChild(column);
  });

  while (finder.firstChild) finder.removeChild(finder.firstChild);
  finder.appendChild(grid);
}

function renderBreadcrumb(current) {
  const breadcrumb = document.getElementById('breadcrumb');
  while (breadcrumb.firstChild) breadcrumb.removeChild(breadcrumb.firstChild);

  const { path } = current;
  const pathArray = path.split('/');
  pathArray.slice(0, pathArray.length - 1).forEach((folderName, idx, arr) => {
    const folderNameText = document.createTextNode(folderName);
    if (idx == arr.length - 1) {
      const folder = document.createElement('div');
      folder.classList.add('active', 'section');
      folder.appendChild(folderNameText);
      breadcrumb.appendChild(folder);
    } else {
      const folder = document.createElement('a');
      const divider = document.createElement('span');
      const dividerText = document.createTextNode('/');
      folder.className = 'section';
      divider.className = 'divider';
      folder.appendChild(folderNameText);
      divider.appendChild(dividerText);
      breadcrumb.appendChild(folder);
      breadcrumb.appendChild(divider);
      folder.onclick = function () {
        goto(findByAbsolutePath(arr.slice(0, idx + 1).join('/')));
        addCommand(`cd ${Array(pathArray.length - 2).fill('..').join('/')}`);
      }
    }
  });
}

function addCommand(command) {
  const history = document.getElementById('history');
  const newCommand = document.createElement('div');
  const dollarColumn = document.createElement('div');
  const cmdColumn = document.createElement('div');
  const manualColumn = document.createElement('div');
  const manualButton = document.createElement('i');

  history.appendChild(newCommand);
  newCommand.appendChild(dollarColumn);
  newCommand.appendChild(cmdColumn);
  newCommand.appendChild(manualColumn);
  dollarColumn.innerHTML += `<span class="command_text"> $ </span>`;
  cmdColumn.innerHTML += `<span class="command_text">${command}</span>`;
  manualColumn.appendChild(manualButton);

  newCommand.id = `command_${historyCount}`;
  newCommand.classList.add('ui', 'three', 'column', 'grid');
  if (historyCount % 2 == 0) newCommand.classList.add('command');
  else newCommand.classList.add('command_color');

  dollarColumn.classList.add('one', 'wide', 'column', 'no_right_pad');
  cmdColumn.classList.add('fourteen', 'wide', 'column', 'no_left_pad');
  manualColumn.classList.add('one', 'wide', 'column');

  manualButton.id = 'm_button';
  manualButton.classList.add('one', 'wide', 'column', 'help', 'icon');
  manualButton.style.cssFloat = 'right';
  manualButton.style.margin = 0;
  manualButton.onclick = function () { showManual() };

  history.scrollTop = history.scrollHeight;

  const $addedCommand = $(`#command_${historyCount}`);
  // TODO: Reformat to callback, decide what 'ease' is
  $addedCommand.animate({backgroundColor: '#aa0000'}, 500);
  $addedCommand.animate({backgroundColor: '#ffffff'}, 500);
  historyCount += 1;
}

function commandInput(e) {
    if (currentMode == 'CUI' && e.keyCode == 13) {
      const commandLine = document.getElementById('command_line');
      const command = commandLine.value;
      if (command){
        addCommand(command);
        //handleCommand(command);
      }
      commandLine.value = '';
    }
}

function handleDelete(filename) {
  console.log(filename);
  const children = current['children'];
  const fileType = findByChildName(current, filename)['type'];

  for (let i = 0; i < children.length; i++) {
    if (children[i]['name'] === filename) {
      children.splice(i, 1);
      break;
    }
  }

  renderHierarchy(current);
  renderFinder(current);

  if (fileType === 'folder') addCommand(`rm -rf ${filename}`);
  else addCommand(`rm -f ${filename}`);
}


/*
function handleCommand(command){
  // TODO : handle '>'
  let args = command.split(' ');
  let op = args[0];
  let argnum = args.length - 1;
  if (op === 'echo'){
    if (argnum != 3) handleError('echo requires 2 argument! \n ex) echo "hi" ');
    let newFile = {
      type: 'file',
      name: args[2],
      path: 'root/aaa/hello.c',
      content: '#include <stdio.h> \n int main(){ \n printf("hello, world!"); \n}',
    }
  }
}
*/

function handleCopy(obj, dirobj){
  if(obj.type === 'folder'){
    let newObj = {
      type: 'folder',
      name: 'ccc',
      path: 'root/aaa/ccc/',
      children: []
    }
  }
  dirobj.children.push()
}

function findByAbsolutePath(path){
  let obj = root;
  const names = path.split('/');
  const currentName = obj.name;

  if (names[0] != '~' && names[0] !== 'root') return -1;
  for (let i = 1; i < names.length; i++){
    if (!names[i]) return obj;
    obj = findByChildName(obj, names[i]);
  }
  return obj;
}

function findByChildName(obj, childName){
  for (child of obj.children) {
    const { type, name } = child;
    if (name === childName) return child;
  }
  return -1;
}

function showManual() {
  document.getElementById('manual').style.visibility = 'visible';
}

function hideManual() {
  document.getElementById('manual').style.visibility = 'hidden';
}
