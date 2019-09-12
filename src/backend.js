export class JobSearch {
  getGHJobPosting(location,keyword) {
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

  getAJJobPosting(location,keyword) {
    return new Promise(function(resolve, reject) {
      let request2 = new XMLHttpRequest();
      console.log(process.env.API_KEY);
      const url2 = `https://cors-anywhere.herokuapp.com/https://authenticjobs.com/api/?api_key=${process.env.API_KEY}&method=aj.jobs.search&format=json&keyword=${keyword}&location=${location}`;

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
