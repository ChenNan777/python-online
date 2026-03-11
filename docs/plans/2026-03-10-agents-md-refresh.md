# AGENTS.md Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 更新仓库根 `AGENTS.md`，使其在约 150 行内准确覆盖命令、验证方式、代码风格与 agent 工作约束。

**Architecture:** 基于现有 `AGENTS.md` 做结构化重写，不改变作用范围，只优化组织方式与信息密度。文档内容以当前仓库真实状态为准，尤其是测试现状和 Cursor/Copilot 规则现状。

**Tech Stack:** Markdown、npm、TypeScript、React、Vite、ESLint。

---

### Task 1: 收敛信息源

**Files:**
- Modify: `AGENTS.md`
- Verify: `package.json`
- Verify: `.cursor/rules/`
- Verify: `.cursorrules`
- Verify: `.github/copilot-instructions.md`

**Step 1: 核对命令来源**

- 从 `package.json` 确认实际可用脚本，并保留对单文件 lint、类型检查和构建的真实命令。

**Step 2: 核对规则文件现状**

- 明确仓库当前不存在 Cursor / Copilot 规则文件，避免文档写出与事实不符的路径内容。

### Task 2: 重写 AGENTS.md

**Files:**
- Modify: `AGENTS.md`

**Step 1: 重排章节顺序**

- 采用“项目概览 -> 目录 -> 命令 -> 验证 -> 编码规范 -> 风险点 -> 规则优先级”的执行手册结构。

**Step 2: 压缩并补充关键规范**

- 保留 import、格式化、类型、命名、错误处理、服务边界、运行时注意点等规则，并移除冗余表述。

**Step 3: 写明测试现状与单测模板**

- 说明当前没有测试脚本或测试文件，同时给出 Vitest 接入后的推荐单测命令模板。

### Task 3: 验证文档质量

**Files:**
- Modify: `AGENTS.md`

**Step 1: 检查长度与覆盖项**

- 确认文档接近 150 行，并覆盖用户要求的 build/lint/test、single test、代码风格和规则文件说明。

**Step 2: 自查内容一致性**

- 确认文档没有虚构命令、没有与仓库现状冲突的规则、没有遗漏现有 `AGENTS.md` 中的重要约束。
