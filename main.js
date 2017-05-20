const $document = $(document);
var modal_on = 0;
let copyorcut = "copy";
let root = {
  type: 'folder',
  name: '~',
  path: '~/',
  children: [
    {
      type: 'folder',
      name: 'aaa',
      path: '~/aaa/',
      children: [
        {
          type: 'folder',
          name: 'ccc',
          path: '~/aaa/ccc/',
          children: []
        },
        {
          type: 'file',
          name: 'hello.c',
          path: '~/aaa/hello.c',
          content: '#include <stdio.h> \n int main(){ \n printf("hello, world!"); \n}',
        },
        {
          type: 'file',
          name: 'hi.txt',
          path: '~/aaa/hi.txt',
          content: 'hi hello bonjour',
        },
      ],
    },
    {
      type: 'folder',
      name: 'bbb',
      path: '~/bbb/',
      children: [
        {
          type: 'file',
          name: 'trash.txt',
          path: '~/bbb/trash.txt',
        },
      ],
    },
    {
      type: 'file',
      name: 'README.md',
      path: '~/README.md',
      content: 'whattheshell mid-fi prototype',
    },
  ],
};
let current = root;
let selectedObj = root;
const descriptions = {
  rm: 'rm removes a folder or a file.',
  cd: 'cd changes current directory.',
  cat: 'cat shows the content of the file.',
  cp: 'cp copies the file or folder.',
}

$document.ready(() => {
  const arrowBtn = document.getElementById('arrow_btn');
  const ctxMenu = document.getElementById('ctxMenu');
  const modal = document.getElementById('modal_popup');

  resizeArrows(arrowSmall, arrowBig);
  renderHierarchy();
  renderModalHierarchy();
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
    let targetPath = event.currentTarget.id;
    selectedObj = findByAbsolutePath(targetPath);
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
    $('.unit').css("background-color", "rgba(0,0,0,0)");
    $(this).css("background-color", "#AAAAAA");
  });


  $document.on('click', function(event) {
    ctxMenu.style.display = 'none';
    ctxMenu.style.left = '';
    ctxMenu.style.top = '';
    // if(modal_on == 1) {
    //   $('#modal_popup').hide();
    //   modal_on =0;
    // }
    $('.unit').css("background-color", "rgba(0,0,0,0)");
  });

  $document.on('click', '.copy', function(event) {
    //event.preventDefault();
    copyorcut = "copy";
    ctxMenu.style.display = '';
    if(modal_on == 0) {
      renderModalHierarchy();
      $('#modal_popup').show();
      $('#modal_popup').focus();
      modal_on = 1;
     }
     return false;
  });

  $document.on('click', '.rename', function(event) {
    //event.preventDefault();
    ctxMenu.style.display = '';
    if(modal_on == 0) {
      $('#modal_popup_rename').show();
      if(selectedObj.type === 'folder'){
        $("#rename_header").html("TYPE NEW FOLDER NAME");
      }
      else{
        $("#rename_header").html("TYPE NEW FILE NAME");
      }
      $('#rename_input').attr("placeholder", selectedObj.name);
      $('#rename_input').focus();
      modal_on = 2;
     }
     return false;
  });


  $document.on('click', '.modal_title', function(event) {
    event.preventDefault();
    event.target.backgroundColor = 'blue';
    return false;
  });


  $document.on('click', '.cut', function(event) {
    //event.preventDefault();
    copyorcut = "cut";
    ctxMenu.style.display = '';
    if(modal_on == 0) {
      renderModalHierarchy();
      $('#modal_popup').show();
      modal_on = 1;
    }
    return false;
  });

  $document.on('click', '.delete', function(event) {
    event.preventDefault();
    handleDelete(selectedObj);
  });

  $('#rename_input').on('input', function(){
    let input_value = this.value;
    if(input_value === ''){
      $('#rename_submit').addClass('disabled');
    }
    else{
      $('#rename_submit').removeClass('disabled');
    }
  });

  $('#rename_submit').click(function(event){
    let new_name = $('#rename_input').val();
    if(new_name !== ''){
      let prev_name = selectedObj.name;
      addCommand(`mv ${prev_name} ${new_name}`);
      selectedObj.name = new_name;
      renderHierarchy();
      renderFinder(current);
      $('#rename_input').val('');
      $('#rename_submit').addClass('disabled');
      $('#modal_popup_rename').hide();
      modal_on = 0;
    }
  });

  $document.on('click', '.unit', function(event) {
    event.preventDefault();
    $('.unit').css("background-color", "rgba(0,0,0,0)");
    $(this).css("background-color", "#AAAAAA");
    ctxMenu.style.display = 'none';
    return false;
  });


  // $document.on('click', '.title', function(event) {
  //   //event.preventDefault();
  //   let selectedFolderName = event.currentTarget.id;
  //   console.log(selectedFolderName);
  // });

  $('#modal_popup').click(function(event) {
    if(modal_on != 0) {
      if(prev_target != 0) prev_target.style.color = '#000000';
      $('#submit_copy').addClass('disabled');
      $('#modal_popup').hide();
      modal_on = 0;
    }
  });

  $('#modal_popup').bind('keydown', function(event) {
    commandInput(event);
  })

  $('#modal_popup_rename').click(function(event) {
    if(modal_on == 2) {
      $('#rename_submit').addClass('disabled');
      $('#modal_popup_rename').hide();
      modal_on = 0;
    }
  });

  let prev_target = 0;
  let target = 0;

  $('.modal_content').click(function(event) {
    if($(event.target).closest('.title').length == 1){
      if(prev_target != 0) prev_target.style.color = '#000000';
      target = $(event.target).closest('.title')[0];
      prev_target = target;
      target.style.color = '#21ae21';
      $('#submit_copy').removeClass('disabled');
    }
    return false;
  });

  $('#submit_copy').click(function(event) {
    if(copyorcut == "copy") {
      if(!$('#submit_copy').hasClass('disabled')){
        let targetObj = findByAbsolutePath(target.id);
        handleCopy(selectedObj, targetObj);
        addCommand(`cp ${selectedObj.name} ${targetObj.path}`);
        if (current === targetObj) {
          renderFinder(current);
        }
        renderHierarchy();
        if(modal_on == 1) {
          if(prev_target != 0) prev_target.style.color = '#000000';
          $('#submit_copy').addClass('disabled');
          $('#modal_popup').hide();
          modal_on =0;
        }
      }
    } else if(copyorcut == "cut") {
      if(!$('#submit_copy').hasClass('disabled')){
        let targetObj = findByAbsolutePath(target.id);
        handleCopy(selectedObj, targetObj);
        handleDelete(selectedObj);
        if (current === targetObj) {
          renderFinder(current);
        }
        renderHierarchy();
        addCommand(`mv ${selectedObj.name} ${targetObj.path}`);
        if(modal_on == 1) {
          if(prev_target != 0) prev_target.style.color = '#000000';
          $('#submit_copy').addClass('disabled');
          $('#modal_popup').hide();
          modal_on =0;
        }
      }
    }
  });
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

function deepcopy(obj) {
  if (obj) return JSON.parse(JSON.stringify(obj));
  else return {};
}

function renderHierarchy() {
  function renderHierarchyRec(current) {
    const currentDir = document.createElement('div');
    currentDir.classList.add('ui', 'accordion');
    current.children.forEach(child => {
      const { type, name, path } = child
      if (type == 'folder') {
        const title = document.createElement('div');
        const dropdown = document.createElement('i');
        const icon = document.createElement('i');
        const nameText = document.createElement('span');

        nameText.innerHTML = name;
        title.classList.add('title', 'non_modal_title');
        title.id = child.path;
        dropdown.classList.add('dropdown', 'icon');
        icon.classList.add('folder', 'icon');
        icon.onclick = () => {
          goto(child);
          addCommand(`cd ${child.path}`);
        }
        nameText.onclick = () => {
          goto(child);
          addCommand(`cd ${child.path}`);
        }
        title.appendChild(dropdown);
        title.appendChild(icon);
        title.appendChild(nameText);
        currentDir.appendChild(title);

        const content = document.createElement('div');
        content.className = 'content';
        content.style.marginTop = '-1em';
        content.style.padding = '0 0 0 1em';
        content.appendChild(renderHierarchyRec(child));
        currentDir.appendChild(content);

        dropdown.onclick = function() {
          title.classList.toggle('active');
          content.classList.toggle('active');
        }
      }
    });
    return currentDir;
  }
  const sidebar = document.getElementById('sidebar');
  while (sidebar.firstChild) sidebar.removeChild(sidebar.firstChild);
  sidebar.appendChild(renderHierarchyRec(root));
}

function renderModalHierarchy() {
  function renderModalHierarchyRec(current) {
    const currentDir = document.createElement('div');
    currentDir.classList.add('ui', 'accordion');
    current.children.forEach(child => {
      const { type, name, path } = child
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
        title.id = path;
        currentDir.appendChild(title);

        const content = document.createElement('div');
        content.className = 'content';
        content.style.marginTop = '-1em';
        content.style.padding = '0 0 0 1em';
        content.appendChild(renderModalHierarchyRec(child));
        currentDir.appendChild(content);

        dropdown.onclick = function() {
          title.classList.toggle('active');
          content.classList.toggle('active');
        }
      }
    });
    return currentDir;
  }
  const hierarchy = document.getElementById('hierarchy');
  while (hierarchy.firstChild) hierarchy.removeChild(hierarchy.firstChild);
  hierarchy.appendChild(renderModalHierarchyRec(root));
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
    icon.style.margin = 'auto';
    icon.style.display = 'block';
    nameText.display = 'block';
    if (type == 'folder') {
      icon.classList.add('huge', 'blue', 'folder', 'icon');
      unit.ondblclick = function () {
        goto(child);
        addCommand(`cd ${name}/`);
      }
    }
    else if (type == 'file') {
      icon.classList.add('huge', 'file', 'icon');
      unit.ondblclick = function () {
        // addCommand(`cat ${name}`);
      }
    }

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
    const divider = document.createElement('span');
    const dividerText = document.createTextNode('/');
    if (idx == arr.length - 1) {
      const folder = document.createElement('div');
      folder.classList.add('active', 'section');
      folder.appendChild(folderNameText);
      breadcrumb.appendChild(folder);
    } else {
      const folder = document.createElement('a');
      folder.className = 'section';
      folder.appendChild(folderNameText);
      breadcrumb.appendChild(folder);
      folder.onclick = function () {
        goto(findByAbsolutePath(arr.slice(0, idx + 1).join('/')));
        addCommand(`cd ${Array(pathArray.length - idx - 2).fill('..').join('/')}/`);
      }
    }
    divider.className = 'divider';
    divider.appendChild(dividerText);
    breadcrumb.appendChild(divider);
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
  manualButton.onclick = function () { showManual(command) };

  history.scrollTop = history.scrollHeight;
  historyCount += 1;
}

function commandInput(e) {
    console.log(e.keyCode);
    if (currentMode == 'CUI' && e.keyCode == 13) {
      const commandLine = document.getElementById('command_line');
      const command = commandLine.value;
      if (command){
        addCommand(command);
        handleCommand(command);
      }
      commandLine.value = '';
    }
    else if (currentMode == 'GUI' && modal_on == 2 && e.keyCode == 13) {
      $('#rename_submit').trigger('click');
    }
    else if (currentMode == 'GUI' && modal_on == 2 && e.keyCode == 27) {
      $('#modal_popup_rename').trigger('click');
    }
    else if (currentMode == 'GUI' && modal_on == 1 && e.keyCode == 27) {
      $('#modal_popup').trigger('click');
    }
}

function handleDelete(fileObj) {
  const filePathFragments = fileObj.path.split('/');
  if (fileObj.type === 'folder') filePathFragments.splice(filePathFragments.length - 2, 1);
  else filePathFragments.splice(filePathFragments.length - 1, 1);
  const parentPath = filePathFragments.join('/');
  const parentObj = findByAbsolutePath(parentPath);

  for (let i = 0; i < parentObj.children.length; i++) {
    if (parentObj.children[i].name === fileObj.name) {
      parentObj.children.splice(i, 1);
      break;
    }
  }

  renderHierarchy();
  renderFinder(current);

  if (fileObj.fileType === 'folder') addCommand(`rm -rf ${fileObj.name}`);
  else addCommand(`rm -f ${fileObj.name}`);
}


function handleCommand(command) {
  // TODO : handle '>'
  let branch = command.split('>');
  let output_name = '';
  console.log(branch);
  if(branch.length == 2) output_name = branch[1];
  let args = branch[0].split(' ');
  console.log(args);
  let op = args[0];
  let argnum = args.length - 1;
  let rest = args.splice(0,1).join();
  if (op === 'echo'){
    //if (argnum != 1) handleError('echo requires 1 argument! \n ex) echo "hi" ');
    let newFile = {
      type: 'file',
      name: output_name,
      path: current.path + output_name,
      content: rest,
    }
    current.children.push(newFile);
  }
  if (op === 'cd'){
    let rest_arr = rest.split('/');
    if(rest_arr[0] === '~') current = findByAbsolutePath(rest);
    //else current = findByChildName(current, rest_arr[0]);
  }
  renderHierarchy();
  renderFinder(current);
}

function handleCopy(obj, dirObj) {
  const newObj = deepcopy(obj);

  let orgPath;
  if (newObj.type === 'folder') orgPath = newObj.path.split('/').slice(0, -2);
  else orgPath = newObj.path.split('/').slice(0, -1);

  replacePath(newObj, `${orgPath.join('/')}/`, dirObj.path);
  dirObj.children.push(newObj);
  renderHierarchy();
  renderFinder(current);
}

function replacePath(target, orgPath, newPath) {
  target.path = target.path.replace(orgPath, newPath);
  if (target.children) {
    target.children.forEach((child) => replacePath(child, orgPath, newPath))
  }
}

function findByAbsolutePath(path) {
  let obj = root;
  const names = path.split('/');
  const currentName = obj.name;
  if (names[0] != '~') return -1;
  for (let i = 1; i < names.length; i++){
    if (!names[i]) return obj;
    obj = findByChildName(obj, names[i]);
  }
  return obj;
}

function findByChildName(obj, childName) {
  for (child of obj.children) {
    const { type, name } = child;
    if (name === childName) return child;
  }
  return -1;
}

function showManual(command) {
  const manualModal = document.getElementById('manual');
  const header = document.getElementById('manual_header');
  const description = document.getElementById('manual_desc');
  const parseCmd = command.split(' ');

  header.innerHTML = command;
  description.innerHTML = descriptions[parseCmd[0]];
  manualModal.style.visibility = 'visible';
}

function hideManual() {
  document.getElementById('manual').style.visibility = 'hidden';
}
