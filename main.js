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
  $('#welcome').modal({ blurring: true }).modal('show', function(){
    $('#welcome').focus();
    $('#welcome').bind('keydown', function(e) {
      console.log('hi');
      if(e.keyCode == 13 || e.keyCode == 27)
        $('#welcome').modal('hide');
    });
  });

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
    if (selectedObj.fileType === 'folder') addCommand(`rm -rf ${ selectedObj.name }`);
    else addCommand(`rm -f ${ selectedObj.name }`);
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
      let parentObj = getParentObject(selectedObj);
      let prev_name = selectedObj.name;
      if(new_name.indexOf(' ') == -1){
        if(prev_name === new_name || hasChildNamed(parentObj, new_name) == 0){
          addCommand(`mv ${prev_name} ${new_name}`);
          selectedObj.name = new_name;
          let new_path = parentObj.path;
          if(selectedObj.type === 'folder'){
            new_path += (new_name + '/');
          }
          else {
            new_path += new_name;
          }
          selectedObj.path = new_path;
          renderHierarchy();
          renderFinder(current);
          $('#rename_input').val('');
          $('#rename_submit').addClass('disabled');
          $('#modal_popup_rename').hide();
          modal_on = 0;
        }
        else {
          $('#rename_input').attr('data-content', 'There is a file using same name!');
          $('#rename_input').popup('show', function(){
            setTimeout(function(){
              console.log('callback');
              $('#rename_input').popup('hide', function(){
                $('#rename_input').popup('destroy');
              });
            }, 2000);
          });
        }
      }
      else{
        $('#rename_input').attr('data-content', 'Whitespace on name is not supported yet.. sorry');
        $('#rename_input').popup('show', function(){
          setTimeout(function(){
            console.log('callback');
            $('#rename_input').popup('hide', function(){
              $('#rename_input').popup('destroy');
            });
          }, 2000);
        });
      }
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
    let targetObj = findByAbsolutePath(target.id);
    if (targetObj.path.indexOf(selectedObj.path) == -1) {
      if(copyorcut == "copy") {
        if(!$('#submit_copy').hasClass('disabled')){
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
    } else {
      alert('you cannot do recursive copy or move');
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
        openFile(child);
        addCommand(`cat ${name}`);
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
    if (currentMode == 'CUI' && e.keyCode == 13) {
      const commandLine = document.getElementById('command_line');
      const command = commandLine.value;
      if (command){
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
  let parentObj = getParentObject(fileObj);
  for (let i = 0; i < parentObj.children.length; i++) {
    if (parentObj.children[i].name === fileObj.name) {
      parentObj.children.splice(i, 1);
      break;
    }
  }

  renderHierarchy();
  renderFinder(current);
}

function handleCommand(command) {
  // TODO : handle '>'
  const redirect = command.split(' > ');
  const args = redirect[0].split(' ');
  const op = args[0];                     // operator
  const rest = args.slice(1);

  if (op === 'echo') {
    if (redirect.length === 2) {
      const outputName = redirect[1];
      const message = rest.join(' ');
      const newFile = {
        type: 'file',
        name: outputName,
        path: current.path + outputName,
        content: message,
      }
      current.children.push(newFile);
    }
    addCommand(command);
  } else if (op === 'cd') {
    if(rest.length == 0){
      current = root;
      addCommand(command);
    }
    else if(rest.length == 1){
      const path = rest[0];
      current = findByPath(path);
      addCommand(command);
    }
    else{
      showErrorMsg('cd usage : cd [folder name] ex) cd aaa');
    }
  } else if (op === 'rm') {
    const flag = rest[0];
    const path = rest[1];
    const pathArray = path.split('/');

    if (!flag.includes('-')) {
      showErrorMsg('No flags');
      return;
    }

    let found;
    if (pathArray[0] === '~') found = findByAbsolutePath(path);
    else found = findByAbsolutePath(current.path + path);
    if (found !== -1) {
      const parent = findByAbsolutePath(parentPath(found.path));
      if (found.type === 'folder') {
        if (!flag.includes('r')) {
          showErrorMsg('Cannot remove directory');
          return;
        }
      }
      for (let i = 0; i < parent.children.length; i++) {
        if (parent.children[i].name === found.name) {
          parent.children.splice(i, 1);
          break;
        }
      }
    } else {
     showErrorMsg('Not found');
    }
  } else if(op === 'cp'){
    if(rest.length == 2){
      const src = rest[0];
      const dst = rest[1];
      let src_obj = findByPath(src);
      if(src_obj == 0){
        showErrorMsg('No such file named ' + src);
      }
      else {
        if(src_obj.type === 'file'){
          if (dst[dst.length-1] === '/'){
            let dst_obj = findByPath(dst);
            if(dst_obj == 0){
              showErrorMsg('cp: directory ' + dst + ' does not exist');
            }
            else if(dst_obj.type === 'file'){
              showErrorMsg('cp: directory ' + dst + ' does not exist');
            }
            else{
              let child = hasChildNamed(dst_obj, src_obj.name);
              if(child == 0){
                let newChild = {
                  type: 'file',
                  name: src_obj.name,
                  path: dst + src_obj.name,
                  content: src_obj.content,
                };
                dst_obj.children.push(newChild);
                addCommand(command);
              }
              else if(child.type === 'file'){
                child.content = src_obj.content;
                addCommand(command);
              }
              else{
                showErrorMsg('cp: cannot overwrite directory ' + child.name + ' with non-directory ' + src_obj.name);
              }
            }
          }
          else{
            let dst_arr = dst.split('/');
            let dst_len = dst_arr.length;
            let dst_filename = dst_arr[dst_len - 1];
            let dir_string = '';
            let dst_dir_obj = current;
            if(dst_len - 1 > 0){
              dir_string = dst_arr.splice(dst_len - 1, 1).join('/') + '/';
              dst_dir_obj = findByPath(dir_string);
            }
            else if(dst[0] == '~'){
              dst_dir_obj = root;
            }
            if(dst_dir_obj == 0 || dst_dir_obj == -1){
              showErrorMsg('cp: directory ' + dst + ' does not exist');
            }
            else if(dst_dir_obj.type === 'folder'){
              let dst_folder_child = hasChildNamed(dst_dir_obj, dst_filename);
              if(dst_folder_child == 0){
                let newChild = {
                  type: 'file',
                  name: dst_filename,
                  path: dst_dir_obj.path + src_obj.name,
                  content: src_obj.content,
                };
                dst_dir_obj.children.push(newChild);
                addCommand(command);
              }
              else if(dst_folder_child.type === 'folder'){
                let last_child = hasChildNamed(dst_folder_child, src_obj.name);
                if(last_child == 0){
                  let newChild = {
                    type: 'file',
                    name: src_obj.name,
                    path: dst_folder_child.path + src_obj.name,
                    content: src_obj.content,
                  };
                  dst_folder_child.children.push(newChild);
                  addCommand(command);
                }
                else if (last_child.type === 'folder'){
                  showErrorMsg('cp: cannot overwrite directory ' + last_child.name + ' with non-directory ' + src_obj.name);
                }
                else{
                  last_child.content = src_obj.content;
                  addCommand(command);
                }
              }
              else{
                dst_folder_child.content = src_obj.content;
                addCommand(command);
              }
            }
          }
        }
        else {
          let dst_arr = dst.split('/');
          if (dst[dst.length-1] === '/'){
            dst_arr.splice(dst_arr.length - 1, 1);
          }
          let dst_len = dst_arr.length;
          let dst_filename = dst_arr[dst_len - 1];
          let dir_string = '';
          let dst_dir_obj = current;
          if(dst_len - 1 > 0){
            dst_arr.splice(dst_len - 1, 1);
            dir_string = dst_arr.join('/') + '/';
            dst_dir_obj = findByPath(dir_string);
          }
          else if(dst[0] == '~'){
            dst_dir_obj = root;
          }
          if(dst_dir_obj == 0 || dst_dir_obj == -1){
            showErrorMsg('cp: directory ' + dst + ' does not exist');
          }
          else if(dst_dir_obj.type === 'folder'){
            let dst_folder_child = hasChildNamed(dst_dir_obj, dst_filename);
            if(dst_folder_child == 0){
              let newChild = {
                type: 'folder',
                name: dst_filename,
                path: dst_dir_obj.path + dst_filename + '/',
                children: src_obj.children,
              };
              replacePath(newChild, src_obj.path, dst_dir_obj.path + dst_filename + '/');
              dst_dir_obj.children.push(newChild);
              addCommand(command);
            }
            else if(dst_folder_child.type === 'folder'){
              let last_child = hasChildNamed(dst_folder_child, src_obj.name);
              if(last_child == 0){
                let newChild = {
                  type: 'folder',
                  name: src_obj.name,
                  path: dst_folder_child.path + src_obj.name + '/',
                  children: src_obj.children,
                };
                replacePath(newChild, src_obj.path, dst_folder_child.path + src_obj.name + '/');
                dst_folder_child.children.push(newChild);
                addCommand(command);
              }
              else if (last_child.type === 'folder'){
                last_child.children = src_obj.children;
                replacePath(last_child, src_obj.path, dst_folder_child.path + src_obj.name + '/');
                addCommand(command);
              }
              else{
                showErrorMsg('cp: cannot overwrite non-directory ' + last_child.name + ' with directory ' + src_obj.name);

              }
            }
            else{
              showErrorMsg('cp: cannot overwrite non-directory ' + dst_folder_child.name + ' with directory ' + src_obj.name);
            }
          }
        }
      }
    }
  } else if (op === 'mv') {
    const srcPath = getAbsolutePath(rest[0]);
    const dstPath = getAbsolutePath(rest[1]);
    if(srcPath == 0 || dstPath == 0) return;
    const srcObj = findByAbsolutePath(srcPath);
    console.log(dstPath);
    const dstObj = findByAbsolutePath(dstPath);
    if(srcObj == 0) {
      return;
    }
    if(dstObj != 0) {
      if(dstObj.type == 'file') {
        if(srcObj.type == 'folder') {
          return;
        } else {
          const newObj = deepcopy(srcObj);
          const orgPath = parentPath(newObj.path);
          const srcParentObj = getParentObject(srcObj);
          const dstParentObj = getParentObject(dstObj);

          replacePath(newObj, `${orgPath}/`, parentPath(dstObj.path));
          newObj.name = dstObj.name;
          for(let i = 0; i < srcParentObj.children.length; i++) {
            if(srcParentObj.children[i].name === srcObj.name) {
              srcParentObj.children.splice(i, 1);
              break;
            }
          }
          for(let i = 0; i < dstParentObj.children.length; i++) {
            if(dstParentObj.children[i].name === dstObj.name) {
              dstParentObj.children.splice(i, 1);
              break;
            }
          }
          dstParentObj.children.push(newObj);
        }
      } else {
        let dup = 0;
        let dup_index = 0;
        const newObj = deepcopy(srcObj);
        const orgPath = parentPath(newObj.path);
        replacePath(newObj, `${orgPath}/`, dstObj.path);
        for(let i = 0; i < dstObj.children.length; i++) {
          if (dstObj.children[i].name === srcObj.name) {
            dup = 1;
            dup_index = i;
            break;
          }
        }
        if(dup == 1) {
          const srcParentObj = getParentObject(srcObj);
          const newObj = deepcopy(srcObj);
          const orgPath = parentPath(newObj.path);
          replacePath(newObj, `${orgPath}/`, dstObj.path);

          if(srcObj.type == 'folder' && dstObj.children[dup_index].type == 'folder') {
            if(dstObj.children[dup_index].children.length == 0) {
              for(let i = 0; i < srcParentObj.children.length; i++) {
                if(srcParentObj.children[i].name === srcObj.name) {
                  srcParentObj.children.splice(i, 1);
                  break;
                }
              }
              dstObj.children.splice(dup_index, 1);
              dstObj.children.push(newObj);
            } else {
              return;
            }
          } else if(srcObj.type == 'file' && dstObj.children[dup_index].type == 'file') {
            for(let i = 0; i < srcParentObj.children.length; i++) {
              if(srcParentObj.children[i].name === srcObj.name) {
                srcParentObj.children.splice(i, 1);
                break;
              }
            }
            dstObj.children.splice(dup_index, 1);
            dstObj.children.push(newObj);
          } else {
            return;
          }
        } else {
          const srcParentObj = getParentObject(srcObj);
          for(let i = 0; i < srcParentObj.children.length; i++) {
            if(srcParentObj.children[i].name === srcObj.name) {
              srcParentObj.children.splice(i, 1);
              break;
            }
          }
          dstObj.children.push(newObj);
        }
      }
      renderHierarchy();
      addCommand(command);
      renderFinder(current);
    } else { /* dstPathObj does not exist */
      const dstPathFrags = dstPath.split('/');
      const newName = dstPathFrags[dstPathFrags.length - 1];
      dstPathFrags.splice(dstPathFrags.length - 1, 1);

      let dstPrevObj;
      if (dstPathFrags.length == 0) dstPrevObj = deepcopy(current);
      else dstPrevObj = findByAbsolutePath(dstPathFrags.join('/'));

      if (dstPrevObj == 0 || dstPrevObj.type != 'folder') { /* dstPrevObj does not exist or it is not a folder */
        // reject(no such directory: rest[0])
        return;
      } else { /* dstPrevObj is a folder */
        /* rename */
        if (dstPrevObj.path == current.path) { /* dstPrevObj is the current directory */
          /* just rename srcObj */
          srcObj.name = newName;
        } else {
          /* move srcObj to dstPrevObj and rename it */
          srcObj.name = newName;
          handleCopy(srcObj, dstPrevObj);
          handleDelete(srcObj);

          renderFinder(current);
          renderHierarchy();
        }
        addCommand(command);
      }
    }
  } else {
    showErrorMsg(''); // default is Sorry, we do not support your command yet.
  }
  renderHierarchy();
  renderFinder(current);
  renderBreadcrumb(current);
}

function showErrorMsg(msg){
  if(msg === ''){
    $('#command_line').attr('data-content', 'Sorry, we do not support your command yet.');
  }
  else{
    $('#command_line').attr('data-content', msg);
  }
  $('#command_line').popup('show', function(){
    setTimeout(function(){
      console.log('callback');
      $('#command_line').popup('hide', function(){
        $('#command_line').popup('destroy');
      });
    }, 2000);
  });
}

function handleCopy(obj, dirObj) {
  const newObj = deepcopy(obj);
  const orgPath = parentPath(newObj.path);

  replacePath(newObj, `${orgPath}/`, dirObj.path);
  dirObj.children.push(newObj);
  renderHierarchy();
  renderFinder(current);
}

function getAbsolutePath(path) {
  let currObj = deepcopy(current);
  const currPathFrags = current.path.split('/');
  currPathFrags.splice(currPathFrags.length - 1, 1);
  const pathFrags = path.split('/');
  for (let i = 0; i < pathFrags.length; i++) {
    if (pathFrags[i] == '.') {}
    else if (pathFrags[i] == '..') {
      currPathFrags.splice(currPathFrags.length - 1, 1);
      if (currPathFrags.length == 0) return 0;
    } else { currPathFrags.push(pathFrags[i]) }
  }

  return currPathFrags.join('/');
}

function parentPath(path) {
  if (path.endsWith('/')) return path.split('/').slice(0, -2).join('/');
  else return path.split('/').slice(0, -1).join('/');
}

function replacePath(target, orgPath, newPath) {
  target.path = target.path.replace(orgPath, newPath);
  if (target.children) {
    target.children.forEach((child) => replacePath(child, orgPath, newPath))
  }
}

function findByPath(path){
  if(path === ''){
    return -10; //
  }
  if(path[0] === '~' || path[0] === '/'){
    return findByAbsolutePath(path);
  }
  else{
    return findByRelativePath(path);
  }
}

function findByAbsolutePath(path) {
  let obj = root;
  const names = path.split('/');
  const currentName = obj.name;
  if (names[0] != '~' && names[0] != '') return 0;
  for (let i = 1; i < names.length; i++){
    console.log('gogo');
    if (!names[i]) return obj;
    obj = findByChildName(obj, names[i]);
    if (obj == 0) return 0;
  }
  return obj;
}

function findByRelativePath(path) {
  let path_arr = path.split('/');
  let iter_obj = current;
  let path_name = path_arr[0];
  for(let i = 0 ; i < path_arr.length ; i++){
    path_name = path_arr[i];
    if(iter_obj == 0){
      return 0;
    }
    if(path_name === '.'){
      continue;
    }
    else if(path_name === ''){
      if(iter_obj.type === 'folder')
        return iter_obj;
      else
        return -1; // is not a directory
    }
    else if(path_name === '..'){
      iter_obj = getParentObject(iter_obj);
    }
    else{
      iter_obj = findByChildName(iter_obj, path_name);
    }
  }
  return iter_obj;
}

function findByChildName(obj, childName) {
  for (child of obj.children) {
    const { type, name } = child;
    if (name === childName) return child;
  }
  return 0;
}

function getParentObject(fileObj) {
  const filePathFragments = fileObj.path.split('/');
  if (fileObj.type === 'folder')
    filePathFragments.splice(filePathFragments.length - 2, 1);
  else
    filePathFragments.splice(filePathFragments.length - 1, 1);
  const parentPath = filePathFragments.join('/');
  const parentObj = findByAbsolutePath(parentPath);
  return parentObj;
}

function hasChildNamed(parentObj, name){
  if(parentObj.type === 'folder'){
    let child_arr = parentObj.children;
    for(let i = 0 ; i < child_arr.length ; i++){
      if(child_arr[i].name === name){
        return child_arr[i];
        break;
      }
    }
    return 0;
  }
  return 0;
}

function makeDirectory(name) {
  const newDir = {
    type: 'folder',
    name,
    path: `${current.path}name/`,
    children: [],
  };
  current.children.push(newDir);
  renderFinder(current);
  renderHierarchy();
}


function openFile(obj) {
  const fileModal = document.getElementById('modal_open_file');
  const fileName = document.getElementById('file_name');
  const fileContent = document.getElementById('file_content');

  fileName.innerHTML = obj.name;
  fileContent.innerHTML = obj.content;
  fileModal.style.display = '';
}

function closeFile() {
  const fileModal = document.getElementById('modal_open_file');
  fileModal.style.display = 'none';
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
