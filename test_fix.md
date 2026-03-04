# 测试用户路径权重计算修复

## 问题
用户在"真实路网最短路径"挑战中点击执行后，计算出的用户路径权重显示为 -1。

## 修复内容

### 1. 添加 None 检查
```python
if __user_result__ is None:
    print("[DEBUG] User solve returned None")
    __user_w__ = -1.0
```

### 2. 详细的路径调试信息
```python
if len(__user_path__) > 0:
    print(f"[DEBUG] User path: {__user_path__[:3]}...{__user_path__[-3:]}")
    print(f"[DEBUG] Expected start: {__start__}, path start: {__user_path__[0]}")
    if len(__user_path__) > 1:
        print(f"[DEBUG] Expected end: {__end__}, path end: {__user_path__[-1]}")
```

### 3. 改进的边验证
```python
if __u__ in __graph__:
    if __v__ in __graph__[__u__]:
        __edge_w__ = float(__graph__[__u__][__v__])
        __w__ += __edge_w__
        print(f"[DEBUG] Edge {__u__} -> {__v__}: weight = {__edge_w__}")
    else:
        print(f"[DEBUG] Edge not found: {__u__} -> {__v__}")
        print(f"[DEBUG] Available neighbors of {__u__}: {list(__graph__[__u__].keys())[:5]}")
else:
    print(f"[DEBUG] Node {__u__} not found in graph")
```

### 4. 单节点路径处理
```python
elif len(__user_path__) == 1:
    if str(__user_path__[0]) == __start__ and __start__ == __end__:
        __user_w__ = 0.0
    else:
        __user_w__ = -1.0
```

## 测试步骤

1. 启动开发服务器：`npm run dev`
2. 打开浏览器访问应用
3. 选择"真实路网最短路径"挑战
4. 输入一个简单的 Dijkstra 算法
5. 点击执行
6. 查看浏览器控制台的调试输出

## 预期结果

控制台应该显示：
- `[DEBUG] Calling user solve function...`
- `[DEBUG] User result type: <class 'list'>, value: [...]`
- `[DEBUG] User path length: X`
- `[DEBUG] User path: [...]`
- `[DEBUG] Edge node_X -> node_Y: weight = Z.Z`
- `[DEBUG] User weight: X.X, valid: True`

如果权重仍然是 -1，调试信息会告诉我们具体原因（节点不存在、边不存在等）。
