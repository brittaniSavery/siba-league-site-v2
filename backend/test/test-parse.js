const fs = require("fs");
const chai = require("chai");
const assert = chai.assert;
const { retrieve, build } = require("../parse");

it("should retrieve webpage", async function () {
  const result = await retrieve(
    "http://localhost:3000/files/generated/SIBAStandings.html"
  );
  assert.include(
    result,
    "Simulation Internet Basketball Association Standings"
  );
});

it("Should throw error for non-existent page", async function () {
  const result = await retrieve("http://localhost:3000/doesNotExist.html");
  assert.typeOf(result, "error");
});

it("Should create json for college team ranking", function () {
  const html = fs.readFileSync("test/files/teamranking.htm", "utf8");
  const result = build("team-ranking", html);
  assert.typeOf(result, "array");
  assert.lengthOf(result, 352);
  assert.equal(result[0].school, "Duke");
  assert.equal(result[81].school, "Charlotte");
  assert.equal(result[222].school, "Portland");
});
