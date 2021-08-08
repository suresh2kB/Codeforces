"use strict";
let URL = "https://codeforces.com/api/user.status?";

let change = "handle=CodeDHMT&from=1&count=500";
let btn = document.querySelector("#btn-submit");

const container = document.querySelector("#questions");
const getSubmissions = async (usp) => {
  const response = await fetch(URL + usp);
  const data = response.json();

  return data;
};
const st1 = new Map();
const st2 = new Map();

btn.addEventListener("click", async function () {
  // container.innerHTML = "";
  console.log("Hello");
  const usernameFirst = document.querySelector("#exampleInputEmail1");
  console.log(usernameFirst.value);
  const usernameSecond = document.querySelector("#exampleInputEmail2");
  console.log(usernameSecond.value);
  // if (usernameFirst) {
  console.log("one");
  const usp = new URLSearchParams(change);
  usp.set("handle", usernameFirst.value);
  const uspc = new URLSearchParams(change);
  uspc.set("handle", usernameSecond.value);
  await getSubmissions(usp)
    .then((data) => {
      console.log("Resolved : ", data);

      for (let i = 0; i < 100; i++) {
        if (data["result"][i]["verdict"] === "OK") {
          // st1.add(data["result"][i]["problem"]["name"]);
          st1.set(
            data["result"][i]["problem"]["name"],
            data["result"][i]["problem"]["contestId"]["index"]
          );
          console.log(data["result"][i]["problem"]["contestId"]["index"]);
        }
      }
      // for (const item of st1.values()) {
      // console.log(item);
      // const newh1 = document.createElement("a");
      // newh1.textContent = item;
      // newh1.setAttribute("href", "https://www.w3schools.com");
      // container.appendChild(newh1);
      // const d1 = document.createElement("div");
      // container.appendChild(d1);
      // document.write("\n");
      // }
    })
    .catch((err) => {
      console.log(err);
      const newh1 = document.createElement("h1");
      newh1.textContent = `No user exist with ${usernameFirst.value} username Try Again!!`;
      container.appendChild(newh1);
    })
    .then(
      await getSubmissions(uspc)
        .then((data) => {
          console.log("Resolved : ", data);
          // const arr =con
          for (let i = 0; i < 100; i++) {
            if (data["result"][i]["verdict"] === "OK") {
              st2.set(
                data["result"][i]["problem"]["name"],
                data["result"][i]["problem"]["contestId"]["index"]
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
          const newh1 = document.createElement("h1");
          newh1.textContent = `No user exist with ${usernameSecond.value} username Try Again!!`;
          container.appendChild(newh1);
        })
    );
  if (st1.size > 0 && st2.size > 0) {
    // console.log("Hello");
    for (const [key, value] of st1.entries()) {
      if (st2.has(key)) {
        const newh1 = document.createElement("a");
        newh1.textContent = key;
        newh1.setAttribute("href", value);
        container.appendChild(newh1);
        const d1 = document.createElement("div");
        container.appendChild(d1);
      }
    }
    console.log(st1.size, st2.size);
  }
});
console.log("hello");
