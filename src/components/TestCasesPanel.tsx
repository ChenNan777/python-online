import { CheckCircle, XCircle } from "lucide-react";
import type { TestCase } from "../pages/ChallengePage/challenges";
import type { TestResult } from "../pages/ChallengePage/useChallengeRunner";

type Props = {
  testCases: TestCase[];
  results: TestResult[] | null;
  consoleOutput: string[];
  allPassed: boolean;
};

export default function TestCasesPanel({ testCases, results, consoleOutput, allPassed }: Props) {
  return (
    <div className="px-3 py-2 space-y-2 theme-panel-strong min-h-full">
      {testCases.map((tc, i) => {
        const result = results?.[i];
        const status = result === undefined ? "pending" : result.passed ? "pass" : "fail";
        return (
          <div
            key={i}
            className={`rounded border text-xs p-2.5 ${
              status === "pass"
                ? "theme-result-pass"
                : status === "fail"
                  ? "theme-result-fail"
                  : "theme-border theme-panel"
             }`}
            >
            <div className="flex items-center gap-2 mb-1">
              {status === "pass" ? (
                <CheckCircle size={13} className="shrink-0 theme-text-success" />
              ) : status === "fail" ? (
                <XCircle size={13} className="shrink-0 theme-text-danger" />
              ) : (
                <div className="w-[13px] h-[13px] rounded-full shrink-0 theme-border" style={{ borderWidth: 1, borderStyle: 'solid' }} />
              )}
              <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                测试 {i + 1}：{tc.description}
              </span>
            </div>
            <div className="ml-5 space-y-0.5" style={{ color: 'var(--text-secondary)' }}>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>输入：</span>
                {tc.args.map((a) => JSON.stringify(a)).join(", ")}
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>期望：</span>
                {tc.checkIsPosition ? "返回 (lng, lat) 坐标" : JSON.stringify(tc.expected)}
              </div>
              {result && !result.passed && (
                <div className="theme-text-danger">
                  <span style={{ color: 'var(--text-tertiary)' }}>实际：</span>
                  {result.actual}
                </div>
              )}
            </div>
          </div>
        );
      })}
      {consoleOutput.length > 0 && (
        <div className="mt-2">
          <div className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>控制台输出</div>
          <pre className="text-xs rounded p-2 whitespace-pre-wrap m-0 theme-console">
            {consoleOutput.join("\n")}
          </pre>
        </div>
      )}
      {allPassed && (
        <div className="mt-2 rounded border px-3 py-2 text-xs font-medium text-center theme-result-pass theme-text-success">
          🎉 全部通过！
        </div>
      )}
    </div>
  );
}
