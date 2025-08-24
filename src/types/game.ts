// 华容道游戏类型定义

export interface Position {
  row: number;
  col: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Piece {
  id: string;
  name: string;
  position: Position;
  size: Size;
  color: string;
}

export interface GameState {
  pieces: Piece[];
  moves: number;
  isWin: boolean;
  gridSize: { rows: number; cols: number };
}

export type Direction = 'up' | 'down' | 'left' | 'right';

// 经典华容道布局
export const CLASSIC_LAYOUT: Piece[] = [
  // 曹操 (2x2)
  {
    id: 'caocao',
    name: '曹操',
    position: { row: 0, col: 1 },
    size: { width: 2, height: 2 },
    color: '#ff6b6b'
  },
  // 关羽 (1x2)
  {
    id: 'guanyu',
    name: '关羽',
    position: { row: 2, col: 1 },
    size: { width: 2, height: 1 },
    color: '#4ecdc4'
  },
  // 张飞 (2x1)
  {
    id: 'zhangfei',
    name: '张飞',
    position: { row: 0, col: 0 },
    size: { width: 1, height: 2 },
    color: '#45b7d1'
  },
  // 赵云 (2x1)
  {
    id: 'zhaoyun',
    name: '赵云',
    position: { row: 0, col: 3 },
    size: { width: 1, height: 2 },
    color: '#f9ca24'
  },
  // 马超 (2x1)
  {
    id: 'machao',
    name: '马超',
    position: { row: 2, col: 0 },
    size: { width: 1, height: 2 },
    color: '#6c5ce7'
  },
  // 黄忠 (2x1)
  {
    id: 'huangzhong',
    name: '黄忠',
    position: { row: 2, col: 3 },
    size: { width: 1, height: 2 },
    color: '#a29bfe'
  },
  // 兵1 (1x1)
  {
    id: 'soldier1',
    name: '兵',
    position: { row: 3, col: 1 },
    size: { width: 1, height: 1 },
    color: '#fd79a8'
  },
  // 兵2 (1x1)
  {
    id: 'soldier2',
    name: '兵',
    position: { row: 3, col: 2 },
    size: { width: 1, height: 1 },
    color: '#fd79a8'
  },
  // 兵3 (1x1)
  {
    id: 'soldier3',
    name: '兵',
    position: { row: 4, col: 0 },
    size: { width: 1, height: 1 },
    color: '#fd79a8'
  },
  // 兵4 (1x1)
  {
    id: 'soldier4',
    name: '兵',
    position: { row: 4, col: 3 },
    size: { width: 1, height: 1 },
    color: '#fd79a8'
  }
];

export const GRID_SIZE = { rows: 5, cols: 4 };
export const WIN_CONDITION = { row: 3, col: 1 }; // 曹操需要到达的位置