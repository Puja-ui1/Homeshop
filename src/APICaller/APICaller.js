import axios from "axios";
import { authHeader } from "../helpers/authHeader";
import config from "../helpers/config";

class APICaller {
  async Post(url) {
    try {
      const response = await axios(config.apiUrl + url, {
        method: "POST",
        headers: authHeader(),
      });
      return await response.data;
    } catch (error) {
      if (
        error.response.status === 401 &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      ) {
        window.location.href = "/SessionExpired";
      }
      console.log(error);
    }
  }

  async PostWithParams(url, inputParams) {
    try {
      const response = await axios(config.apiUrl + url, {
        method: "POST",
        params: inputParams,
        headers: authHeader(),
      });
      return await response.data;
    } catch (error) {
      if (
        error.response.status === 401 &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      ) {
        window.location.href = "/SessionExpired";
      }
      console.log(error);
    }
  }
  async PostWithData(url, inputData) {
    try {
      const response = await axios(config.apiUrl + url, {
        method: "POST",
        data: inputData,
        headers: authHeader(),
      });

      return await response.data;
    } catch (error) {
      if (
        error.response.status === 401 &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      ) {
        window.location.href = "/SessionExpired";
      }
    }
  }
  async PostWithHeader(url, header) {
    try {
      const response = await axios(config.apiUrl + url, {
        method: "POST",
        headers: header,
      });

      return await response.data;
    } catch (error) {
      if (
        error.response.status === 401 &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      ) {
        window.location.href = "/SessionExpired";
      }
    }
  }
  async PostWithHeaderandData(url, header, inputData) {
    try {
      const response = await axios(config.apiUrl + url, {
        method: "POST",
        headers: header,
        data: inputData,
      });
      if (response.data) {
        console.log(response.data);
        if (
          response.data.statusCode === 401 &&
          /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        ) {
          window.location.href = "/SessionExpired";
        }
      }
      return await response.data;
    } catch (error) {
      if (
        error.response.status === 401 &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      ) {
        window.location.href = "/SessionExpired";
      }
    }
  }
  async PostWithHeaderandParams(url, header, inputParams) {
    try {
      const response = await axios(config.apiUrl + url, {
        method: "POST",
        headers: header,
        params: inputParams,
      });

      return await response.data;
    } catch (error) {
      if (
        error.response.status === 401 &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      ) {
        window.location.href = "/SessionExpired";
      }
    }
  }

  async GetWithData(url, inputData) {
    try {
      const response = await axios(config.apiUrl + url, {
        method: "GET",
        data: inputData,
        headers: authHeader(),
      });

      return await response.data;
    } catch (error) {
      if (
        error.response.status === 401 &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      ) {
        window.location.href = "/SessionExpired";
      }
    }
  }
  async GetWithParams(url, inputParams) {
    try {
      const response = await axios(config.apiUrl + url, {
        method: "GET",
        params: inputParams,
        headers: authHeader(),
      });

      return await response.data;
    } catch (error) {
      if (
        error.response.status === 401 &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      ) {
        window.location.href = "/SessionExpired";
      }
    }
  }
  async GetWithHeader(url, headerData) {
    try {
      const response = await axios(config.apiUrl + url, {
        method: "GET",
        headers: headerData,
      });

      return await response.data;
    } catch (error) {
      if (
        error.response.status === 401 &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      ) {
        window.location.href = "/SessionExpired";
      }
      console.log(error);
    }
  }
  async GetWithHeaderandParams(url, headerData, inputParams) {
    try {
      const response = await axios(config.apiUrl + url, {
        method: "GET",
        headers: headerData,
        params: inputParams,
      });

      return await response.data;
    } catch (error) {
      if (
        error.response.status === 401 &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      ) {
        window.location.href = "/SessionExpired";
      }
      console.log(error);
    }
  }

  //To get the suggestion of message on typing
  // async GetSuggestionTextOnTyping(url, headerData, inputParams) {
  //   try {
  //     const response = await axios(config.apiUrl + url, {
  //       method: "GET",
  //       headers: headerData,
  //       params: inputParams,
  //     });

  //     return await response.data;
  //   } catch (error) {
  //     if (
  //       error.response.status === 401 &&
  //       /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  //     ) {
  //       window.location.href = "/SessionExpired";
  //     }
  //     console.log(error);
  //   }
  // }
}

export default APICaller;
