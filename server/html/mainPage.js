
module.exports.mainPage = (items)=> {
    return `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simple To-Do App</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
      </head>
      <body>
        <div class="container">
          <h1 class="display-4 text-center py-1">To-Do App</h1>
          
          <div class="jumbotron p-3 shadow-sm">
              <div class="d-flex align-items-center">
                <input name='item' autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                <button class="create-item btn btn-primary">Add New Item</button>
              </div>
          </div>
          
          <ul class="list-group pb-5">
          </ul>

          </div>
          <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
          <script>let items = ${JSON.stringify(items)}</script>
          <script src="functions.js"></script>
          <script src="browser.js"></script>
        </body>
      </html>`
}