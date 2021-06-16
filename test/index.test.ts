"use strict";
// See https://github.com/textlint/textlint/tree/master/packages/textlint-tester

// rule
import rule from "../src/index";
import TextLintTester from "textlint-tester";
const tester = new TextLintTester();
tester.run("rule", rule, {
  valid: [
    "- foo",
    "- foo\n- bar",
    "- foo\n- bar\n  - baz",
    {
      text: "- foo,bar",
      options: {
        commmaMarks: ["、"],
      },
    },
    {
      text: "1. foo,bar",
      options: {
        allowOrderedList: true,
      },
    },
  ],
  invalid: [
    {
      text: "- foo,bar",
      errors: [
        {
          message: "Include comma.",
          line: 1,
          column: 4,
        },
      ],
    },
    {
      text: "- foo\n- foo,bar",
      errors: [
        {
          message: "Include comma.",
          line: 2,
          column: 4,
        },
      ],
    },
    {
      text: "- foo<br>foo,bar",
      errors: [
        {
          message: "Include comma.",
          line: 1,
          column: 11,
        },
      ],
    },
    {
      text: "- foo、ba,r",
      errors: [
        {
          message: "Include comma.",
          line: 1,
          column: 4,
        },
        {
          message: "Include comma.",
          line: 1,
          column: 7,
        },
      ],
    },
    {
      text: "1. foo,bar",
      errors: [
        {
          message: "Include comma.",
          line: 1,
          column: 4,
        },
      ],
    },
  ],
});
