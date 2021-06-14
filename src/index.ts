import { TextlintRuleModule } from "@textlint/types";
import { TxtNode } from "@textlint/ast-node-types";
import execAll from "execall";

export interface Options {
  commmaMarks: string[];
  allowOrderedList: boolean;
}

const isItemNodeInOrderedList = (node: TxtNode) => {
  return node && node.parent && node.parent.ordered === true;
};

const defaultOptions = {
  commmaMarks: [",", "、", "，"],
  allowOrderedList: false,
};

const reporter: TextlintRuleModule<Partial<Options>> = (
  context,
  options = {}
) => {
  const { Syntax, RuleError, report, getSource } = context;

  const commmaMarks =
    options.commmaMarks !== undefined
      ? options.commmaMarks
      : defaultOptions.commmaMarks;
  const allowOrderedList =
    options.allowOrderedList !== undefined
      ? options.allowOrderedList
      : defaultOptions.allowOrderedList;

  const commaPattern = new RegExp(`\[${commmaMarks.join("")}\]`, "g");
  return {
    [Syntax.ListItem](node) {
      // Skip OrderddList if option is exabled.
      if (allowOrderedList && isItemNodeInOrderedList(node)) {
        return;
      }
      // A ListItem should includes child nodes.
      // https://github.com/textlint-rule/textlint-rule-period-in-list-item/issues/3
      const paragraphNodes = node.children.filter(
        (node) => node.type === Syntax.Paragraph
      );
      const firstParagraphNode = paragraphNodes[0];
      if (!firstParagraphNode) {
        return;
      }
      const text = getSource(firstParagraphNode);
      const results = execAll(commaPattern, text);
      results.forEach((result) => {
        const index = result.index;
        const ruleError = new RuleError(`Include comma.`, {
          index: index,
        });
        report(node, ruleError);
      });
    },
  };
};
export default reporter;
