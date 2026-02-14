from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from collections import defaultdict, deque

app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges

    num_nodes = len(nodes)
    num_edges = len(edges)

    # Check if the graph is a DAG using Kahn's algorithm (topological sort)
    is_dag = check_is_dag(nodes, edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }

def check_is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph (DAG) using Kahn's algorithm.
    Returns True if it's a DAG, False if it contains cycles.
    """
    # Build adjacency list and calculate in-degrees
    graph = defaultdict(list)
    in_degree = defaultdict(int)

    # Initialize all nodes with in-degree 0
    node_ids = {node.id for node in nodes}
    for node_id in node_ids:
        in_degree[node_id] = 0

    # Build the graph
    for edge in edges:
        graph[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    # Find all nodes with in-degree 0
    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])

    # Process nodes in topological order
    sorted_count = 0

    while queue:
        node = queue.popleft()
        sorted_count += 1

        # Reduce in-degree for all neighbors
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If we processed all nodes, it's a DAG
    # If not, there's a cycle
    return sorted_count == len(node_ids)
