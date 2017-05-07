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

  const arrow_btn = document.getElementById('arrow_btn');
  const right_arrow = document.getElementById('arrow_right_icon');
  const left_arrow = document.getElementById('arrow_left_icon');
  arrow_btn.onmouseover = function() {
    if (current_mode == 'gui_window') {
      right_arrow.style.fontSize = '3.5em';
      left_arrow.style.fontSize = '2em';
    } else {
      right_arrow.style.fontSize = '2em';
      left_arrow.style.fontSize = '3.5em';
    }
  };
  arrow_btn.onmouseout = function() {
    if (current_mode == 'gui_window') {
      right_arrow.style.fontSize = '4em';
      left_arrow.style.fontSize = '1.5em';
    } else {
      right_arrow.style.fontSize = '1.5em';
      left_arrow.style.fontSize = '4em';
    }
  };


  // const gui_window = document.getElementById('gui_window');
  // const cui_commandline = document.getElementById('cui_commandline');
  // gui_window.onmouseover = function() {
  //   if (current_mode == 'cui_commandline') {
  //     right_arrow.style.fontSize = '2em';
  //     left_arrow.style.fontSize = '3.5em';
  //   }
  // };
  // gui_window.onmouseout = function() {
  //   if (current_mode == 'gui_window') {
  //     right_arrow.style.fontSize = '4em';
  //     left_arrow.style.fontSize = '1.5em';
  //   } else {
  //     right_arrow.style.fontSize = '1.5em';
  //     left_arrow.style.fontSize = '4em';
  //   }
  // };
  // cui_commandline.onmouseover = function() {
  //   if (current_mode == 'gui_window') {
  //     right_arrow.style.fontSize = '3.5em';
  //     left_arrow.style.fontSize = '2em';
  //   }
  // };
  // cui_commandline.onmouseout = function() {
  //   if (current_mode == 'gui_window') {
  //     right_arrow.style.fontSize = '4em';
  //     left_arrow.style.fontSize = '1.5em';
  //   } else {
  //     right_arrow.style.fontSize = '1.5em';
  //     left_arrow.style.fontSize = '4em';
  //   }
  // };
})

let current_mode = 'gui_window';
let history_num = 0;

function changeModeListener(clicked_id) {
  const gui_window = document.getElementById('gui_window');
  const cui_commandline = document.getElementById('cui_commandline');
  const right_arrow = document.getElementById('arrow_right_icon');
  const left_arrow = document.getElementById('arrow_left_icon');
  if ((clicked_id == 'arrow_btn' && current_mode == 'gui_window')
    || (clicked_id == 'cui_commandline')) {
    gui_window.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
    gui_window.style.backgroundColor = '#ffffff'
    cui_commandline.style.boxShadow = 'inset 0 3px 8px rgba(0,0,0,0.24)';
    cui_commandline.style.backgroundColor = '#fcfcfc'
    cui_commandline.placeholder='';
    cui_commandline.focus();
    right_arrow.style.fontSize = '2em';
    left_arrow.style.fontSize = '3.5em';
    current_mode = 'cui_commandline';
  } else if ((clicked_id == 'arrow_btn' && current_mode == 'cui_commandline')
    || (clicked_id == 'gui_window')) {
    gui_window.style.boxShadow = 'inset 0 3px 8px rgba(0,0,0,0.24)';
    gui_window.style.backgroundColor = '#fcfcfc'
    cui_commandline.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
    cui_commandline.style.backgroundColor = '#ffffff'
    cui_commandline.value = '';
    cui_commandline.placeholder='Type your command here';
    right_arrow.style.fontSize = '3.5em';
    left_arrow.style.fontSize = '2em';
    current_mode = 'gui_window';
  }
};

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

      title.classList.add('active', 'title');
      dropdown.classList.add('dropdown', 'icon');
      icon.classList.add('folder', 'icon');
      title.appendChild(dropdown);
      title.appendChild(icon);
      title.appendChild(nameText);
      currentDir.appendChild(title);

      const content = document.createElement('div');
      content.classList.add('active', 'content');
      content.style.marginTop = '-1em';
      content.style.padding = '0 0 0 1em';
      content.appendChild(renderHierarchy(child));
      currentDir.appendChild(content);
    }
  });

  return currentDir;
}

function renderFinder(current) {
}

function addCommand(command){
  let tag = '<div id=\"command_' + history_num + '\" class=\"command\">' + command + '<i id=\"m_button\" class=\"help icon\" style=\"float:right;\" onclick="showManual()\"></i></div>';
  if(command == "")
    tag += "<br>";
  $('#history').append(tag);
  $("#history").scrollTop($("#history")[0].scrollHeight);
  $( "#command_" + history_num ).animate({
    backgroundColor: "#aa0000"
  }, 500, function(){
    $( "#command_" + history_num ).animate({
      backgroundColor: "#ffffff"
    }, 500);
  } );
  history_num += 1;
}

function commandInput(e){
    if (current_mode == 'cui_commandline' && e.keyCode == 13) {
      let cui_input = document.getElementById('cui_commandline');
      let command = cui_input.value;
      if(command == "")
        return;
      addCommand(command);
      cui_input.value = "";
    }
}

function showManual(){
  document.getElementById('manual').style.visibility = 'visible';
}

function hideManual(){
  document.getElementById('manual').style.visibility = 'hidden';
}
