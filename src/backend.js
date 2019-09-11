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

export class DadJoke {
  getDadJoke() {
    return new Promise(function(resolve, reject) {
      let request2 = new XMLHttpRequest();
      const url2 = 'https://icanhazdadjoke.com/?id=R7UfaahVfFd&format=json';
      request2.onload = function() {
        if (this.status === 200) {
          resolve(request2.response);
        } else {
          reject(Error(request2.statusText));
        }
      };
      request2.open("GET", url2, true);
      request2.send();
    });
  }
}
