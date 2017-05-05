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
            path: 'root/aaa/hello.c'
          },
          {
            type: 'file',
            name: 'hi.txt',
            path: 'root/aaa/hi.txt'
          }
        ]
      },
      {
        type: 'folder',
        name: 'bbb',
        path: 'root/bbb/',
        children: [
          {
            type: 'file',
            name: 'trash.txt',
            path: 'root/bbb/trash.txt'
          }
        ]
      },
      {
        type: 'file',
        name: 'README.md',
        path: 'root/README.md',
        children: []
      }
    ]
  }
  let current = root
  let sidebar = document.getElementById('sidebar')
  let finder = document.getElementById('finder')
  sidebar.appendChild(renderHierarchy(root))
  renderFinder(current)
})

function renderHierarchy(current) {
  let currentDir = document.createElement('div')
  currentDir.classList.add('ui', 'accordion')
  for (let child of current.children) {
    let title = document.createElement('div')
    let dropdown = document.createElement('i')
    let icon = document.createElement('i')
    let name = document.createTextNode(child.name)

    title.classList.add('active', 'title')
    dropdown.classList.add('dropdown', 'icon')
    title.appendChild(dropdown)
    title.appendChild(icon)
    title.appendChild(name)
    currentDir.appendChild(title)

    if (child.type != 'folder') dropdown.style.opacity = 0
    if (child.type == 'folder') icon.classList.add('folder', 'icon')
    else if (child.type == 'file') icon.classList.add('file', 'icon')

    if (child.type == 'folder') {
      let content = document.createElement('div')
      content.classList.add('active', 'content')
      content.style.marginTop = '-1em'
      content.style.padding = '0 0 0 1em'
      content.appendChild(renderHierarchy(child))
      currentDir.appendChild(content)
    }
  }
  return currentDir
}

function renderFinder(current) {
}
