#!/usr/bin/env python3
"""
Test to verify the path validation logic works correctly
"""

def validate_path(graph, start, end, user_path):
    """
    Simulates the validation logic from pyodide.worker.ts
    Returns (weight, valid, error_message)
    """
    if not user_path:
        return -1.0, False, "Empty path"

    if len(user_path) == 1:
        if str(user_path[0]) == start and start == end:
            return 0.0, True, "Single node path (start == end)"
        else:
            return -1.0, False, "Invalid single node path"

    # Validate start and end
    if str(user_path[0]) != start:
        return -1.0, False, f"Path does not start at start node: '{user_path[0]}' != '{start}'"

    if str(user_path[-1]) != end:
        return -1.0, False, f"Path does not end at end node: '{user_path[-1]}' != '{end}'"

    # Validate all edges and compute weight
    weight = 0.0
    for i in range(len(user_path) - 1):
        u = str(user_path[i])
        v = str(user_path[i + 1])

        if u not in graph:
            return -1.0, False, f"Node {u} not found in graph"

        if v not in graph[u]:
            return -1.0, False, f"Edge not found: {u} -> {v}"

        weight += float(graph[u][v])

    return weight, True, "Valid path"


# Test cases
def test_valid_path():
    graph = {
        "A": {"B": 10.0, "C": 5.0},
        "B": {"D": 15.0},
        "C": {"D": 20.0},
        "D": {}
    }

    # Test 1: Valid path
    weight, valid, msg = validate_path(graph, "A", "D", ["A", "B", "D"])
    assert valid == True, f"Test 1 failed: {msg}"
    assert weight == 25.0, f"Test 1 weight wrong: {weight}"
    print(f"[PASS] Test 1: Valid path A->B->D, weight={weight}")

    # Test 2: Path doesn't start at start
    weight, valid, msg = validate_path(graph, "A", "D", ["B", "D"])
    assert valid == False, "Test 2 should fail"
    assert weight == -1.0, "Test 2 should return -1"
    print(f"[PASS] Test 2: Correctly rejected path not starting at start: {msg}")

    # Test 3: Path doesn't end at end
    weight, valid, msg = validate_path(graph, "A", "D", ["A", "B"])
    assert valid == False, "Test 3 should fail"
    assert weight == -1.0, "Test 3 should return -1"
    print(f"[PASS] Test 3: Correctly rejected path not ending at end: {msg}")

    # Test 4: Edge doesn't exist
    weight, valid, msg = validate_path(graph, "A", "D", ["A", "D"])
    assert valid == False, "Test 4 should fail"
    assert weight == -1.0, "Test 4 should return -1"
    print(f"[PASS] Test 4: Correctly rejected non-existent edge: {msg}")

    # Test 5: Empty path
    weight, valid, msg = validate_path(graph, "A", "D", [])
    assert valid == False, "Test 5 should fail"
    assert weight == -1.0, "Test 5 should return -1"
    print(f"[PASS] Test 5: Correctly rejected empty path: {msg}")

    # Test 6: Single node (start == end)
    weight, valid, msg = validate_path(graph, "A", "A", ["A"])
    assert valid == True, "Test 6 should pass"
    assert weight == 0.0, "Test 6 should return 0"
    print(f"[PASS] Test 6: Single node path when start==end: {msg}")

    print("\n[SUCCESS] All tests passed!")


if __name__ == "__main__":
    test_valid_path()
