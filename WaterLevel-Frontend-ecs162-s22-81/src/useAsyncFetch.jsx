import React, {useEffect} from 'react';

const useAsyncFetch = function (url, options, thenFun, catchFun ) {
  let update = options.body;
  async function fetchData(options) {
    let api_url = '/query/getWaterData';
    let response = await fetch(api_url, options);

    let json = await response.json();

    thenFun(json);
  }
  
  useEffect(function () {
    console.log("Calling fetch, update is: ", update);
    fetchData(options);
  }, [update]);

}

export default useAsyncFetch;