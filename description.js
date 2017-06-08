const manuals = {
  echo: `
  <h4 class="ui header">echo repeats (echoes) the input string.</h4>
  <h5 class="ui header">Form</h5>
  <a class="ui large green horizontal label">echo</a>
  <a class="ui large grey horizontal label">string</a>
  <a class="ui large grey horizontal label">> output file (optional)</a>

  <h5 class="ui header">Examples</h5>
  <table class="ui compact very basic table">
    <tbody>
      <tr>
        <td><div class="ui large green horizontal label">echo "Hello"</div></td>
        <td>Write <b>Hello</b> on the shell</td>
      </tr>
      <tr>
        <td><div class="ui large green horizontal label">echo "Hi" > hi.txt</div></td>
        <td>Write <b>Hi</b> to the file <b>hi.txt</b></td>
      </tr>
    </tbody>
  </table>
  `,

  rm: `
  <h4 class="ui header">rm (remove) removes files or folders.</h4>
  <h5 class="ui header">Form</h5>
  <a class="ui large green horizontal label">rm</a>
  <a class="ui large grey horizontal label">options</a>
  <a class="ui large grey horizontal label">files/folders</a>

  <h5 class="ui header">Examples</h5>
  <table class="ui compact very basic table">
    <tbody>
      <tr>
        <td><div class="ui large green horizontal label">rm hi.txt</div></td>
        <td>Remove <b>hi.txt</b></td>
      </tr>
      <tr>
        <td><div class="ui large green horizontal label">rm x.txt y.txt</div></td>
        <td>Remove <b>x.txt</b> and <b>y.txt</b></td>
      </tr>
      <tr>
        <td><div class="ui large green horizontal label">rm -r aaa</div></td>
        <td>
          Remove the folder <b>aaa</b> <br/>
          Fails if you miss <b>-r</b>
        </td>
      </tr>
      <tr>
        <td><div class="ui large green horizontal label">rm -f hi.txt</div></td>
        <td>Remove <b>hi.txt</b> without permission</td>
      </tr>
      <tr>
        <td><div class="ui large green horizontal label">rm -rf aaa</div></td>
        <td>
          Remove the folder <b>aaa</b> without permission <br/>
          Fails if you miss <b>-r</b>
        </td>
      </tr>
    </tbody>
  </table>
  `,

  cd: `
  <h4 class="ui header">cd (change directory) changes your current directory.</h4>
  <h5 class="ui header">Form</h5>
  <a class="ui large green horizontal label">cd</a>
  <a class="ui large grey horizontal label">destination folder</a>

  <h5 class="ui header">Examples</h5>
  <table class="ui compact very basic table">
    <tbody>
      <tr>
        <td><div class="ui large green horizontal label">cd aaa</div></td>
        <td>Move to the folder <b>aaa</b></td>
      </tr>
      <tr>
        <td><div class="ui large green horizontal label">cd ~/bbb</div></td>
        <td>Move to the folder <b>bbb</b> in the home directory</td>
      </tr>
      <tr>
        <td><div class="ui large green horizontal label">cd ..</div></td>
        <td>Move to the <b>parent directory</b></td>
      </tr>
    </tbody>
  </table>
  `,

  mkdir: `
  <h4 class="ui header">mkdir (make directory) creates a new directory.</h4>
  <h5 class="ui header">Form</h5>
  <a class="ui large green horizontal label">mkdir</a>
  <a class="ui large grey horizontal label">new folder name</a>

  <h5 class="ui header">Examples</h5>
  <table class="ui compact very basic table">
    <tbody>
      <tr>
        <td>
          <div class="ui large green horizontal label">mkdir aaa</div>
        </td>
        <td>
          Create a new folder <b>aaa</b> <br/>
          Fails if <b>aaa</b> already exists
        </td>
      </tr>
      <tr>
        <td><div class="ui large green horizontal label">mkdir bbb/aaa</div></td>
        <td>
          Create a new folder <b>aaa</b> inside <b>bbb</b> <br/>
          Fails if <b>bbb</b> does not exist
        </td>
      </tr>
    </tbody>
  </table>
  `,

  cat: `
  <h4 class="ui header">cat (catenate) display the content of the file.</h4>
  <h5 class="ui header">Form</h5>
  <a class="ui large green horizontal label">cat</a>
  <a class="ui large grey horizontal label">file name</a>

  <h5 class="ui header">Examples</h5>
  <table class="ui compact very basic table">
    <tbody>
      <tr>
        <td><div class="ui large green horizontal label">cat hello.txt</div></td>
        <td>Display the content of <b>hello.txt</b></td>
      </tr>
      <tr>
        <td><div class="ui large green horizontal label">cat aaa/hi.txt</div></td>
        <td>Display the content of <b>hi.txt</b> in <b>aaa</b></td>
      </tr>
    </tbody>
  </table>
  `,

  cp: `
  <h4 class="ui header">cp (copy) copies files or folders to other directory.</h4>
  <h5 class="ui header">Form</h5>
  <a class="ui large green horizontal label">cp</a>
  <a class="ui large grey horizontal label">options</a>
  <a class="ui large grey horizontal label">files/folders to copy</a>
  <a class="ui large grey horizontal label">destination</a>

  <h5 class="ui header">Examples</h5>
  <table class="ui compact very basic table">
    <tbody>
      <tr>
        <td><div class="ui large green horizontal label">cp hi.txt aaa</div></td>
        <td>Copy <b>hi.txt</b> to <b>aaa</b></td>
      </tr>
      <tr>
        <td><div class="ui large green horizontal label">cp -r aaa bbb</div></td>
        <td>
          Copy the folder <b>aaa</b> to <b>bbb</b> <br/>
          Fails if you miss <b>-r</b>
        </td>
      </tr>
      <tr>
        <td><div class="ui large green horizontal label">cp x.txt y.txt aaa</div></td>
        <td>Copy <b>x.txt</b> and <b>y.txt</b> to <b>aaa</b></td>
      </tr>
    </tbody>
  </table>
  `,

  mv: `
  <h4 class="ui header" style="margin-bottom: 0">mv (move) has two functions:</h4>
  <h4 class="ui header" style="margin-top: 1rem">Move a file/folder to the other directory, or rename it.</h4>
  <h5 class="ui header">Form</h5>
  <a class="ui large green horizontal label">mv</a>
  <a class="ui large grey horizontal label">options</a>
  <a class="ui large grey horizontal label">files/folders to move</a>
  <a class="ui large grey horizontal label">destination</a>
  <h5 class="ui header" style="text-align: center; margin-top: 1rem">OR</h6>
  <a class="ui large green horizontal label">mv</a>
  <a class="ui large grey horizontal label">options</a>
  <a class="ui large grey horizontal label">file/folder to rename</a>
  <a class="ui large grey horizontal label">new name</a>

  <h5 class="ui header">Examples</h5>
  <table class="ui compact very basic table">
    <tbody>
      <tr>
        <td><div class="ui large green horizontal label">mv hi.txt aaa</div></td>
        <td>
          Move <b>hi.txt</b> to <b>aaa</b> <br/>
          Only if the folder <b>aaa</b> exists
        </td>
      </tr>
      <tr>
        <td><div class="ui large green horizontal label">mv hi.txt go.txt</div></td>
        <td>
          Rename <b>hi.txt</b> to <b>go.txt</b> <br/>
          Only if <b>go.txt</b> does not exist
        </td>
      </tr>
      <tr>
        <td><div class="ui large green horizontal label">mv aaa bbb</div></td>
        <td>
          Move <b>aaa</b> to <b>bbb</b> <br/>
          Only if the folder <b>bbb</b> exists
        </td>
      </tr>
      <tr>
        <td><div class="ui large green horizontal label">mv aaa bbb</div></td>
        <td>
          Rename <b>aaa</b> to <b>bbb</b> <br/>
          Only if the folder <b>bbb</b> does not exist
        </td>
      </tr>
    </tbody>
  </table>
  `,
}
