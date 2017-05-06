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
})

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
