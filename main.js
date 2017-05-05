$(document).ready(() => {
  let root = [
    {
      type: 'folder',
      name: 'aaa',
      path: 'root/aaa',
      children: [
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
      path: 'root/bbb',
      children: [
        {
          type: 'file',
          name: 'trash.txt',
          path: 'root/bbb/trash.txt'
        }
      ]
    }
  ]
});
