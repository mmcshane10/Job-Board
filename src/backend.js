export class JobSearch {
  getJobPosting(location,keyword) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();

      const url = `https://github-jobs-proxy.appspot.com/positions?description=${keyword}&location=${location}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}

 
