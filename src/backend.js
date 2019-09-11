export class JobSearch {
  getJobPosting(location,keyword) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://jobs.github.com/positions.json?description=${keyword}&location=${location}`;
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
