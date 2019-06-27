require 'set'
require 'byebug'

maze = []
maze2 = []
start = []
finish = []
line_num = 0
File.readlines("maze2.txt").each do |line|
    l = line.split('')
    l.pop
    cs = l.index("S")
    cf = l.index("E")
    start = [line_num,cs] if cs
    finish = [line_num,cf] if cf
    maze.push(l)
    maze2.push(l)
    puts line
    line_num += 1
end
puts

class Node
    attr_accessor :num, :pos, :path, :i
    def initialize(num, pos, path,i)
        @num = num
        @pos = pos
        @path = path.dup.push(pos)
        @i = i
    end
end

class MinHeap
    attr_reader :heap, :lookup
    def initialize
        @heap = []
        @lookup = Hash.new
    end

    def add(num, pos, path)
        node = Node.new(num,pos,path,@heap.length - 1)
        @lookup[pos] = node
        @heap.push(node)
        self.bubble_up(@heap.length - 1)
    end

    def update(pos,num)
        @lookup[pos] = num
        self.bubble_up(@lookup[pos].i)
    end

    def bubble_up(i)
        return if i == 0
        if i.odd?
            p = (i - 1) / 2
        else
            p = (i - 2) / 2
        end
        if @heap[i].num < @heap[p].num
            @heap[i].i = p
            @heap[p].i = i
            @heap[i],@heap[p] = @heap[p],@heap[i]
            bubble_up(p)
        end
    end

    def min
        return null if @heap.empty?
        min = @heap[0]
        node = @heap.pop
        @heap[0] = node 
        bubble_down(0)
        min
    end

    def bubble_down(i)
        c1 = 2*i + 1
        c2 = 2*i + 2
        if @heap[c1] && @heap[c1].num < @heap[i].num
            @heap[c1].i = i
            @heap[i].i = c1
            @heap[c1], @heap[i] = @heap[i], @heap[c1]
            self.bubble_down(c1)
        elsif @heap[c2] && @heap[c2].num < @heap[i].num
            @heap[c2].i = i
            @heap[i].i = c2
            @heap[c2], @heap[i] = @heap[i], @heap[c2]
            self.bubble_down(c2)
        end
    end
end

def poss_neigh(pos,maze)
    ans = []
    [[1,0],[-1,0],[0,-1],[0,1]].each do |delta|
        r = pos[0] + delta[0]
        c = pos[1] + delta[1]
        if r >= 0 && c >= 0 &&
            r < maze.length && c < maze[0].length &&
            maze[r][c] != "*"
            ans.push([r,c])
        end
    end
    ans
end

def print_path(path,maze)

    m = maze
    path.each do |pos| 
        m[pos[0]][pos[1]] = "X"
    end
    m.each do |line|
        puts line.join("")
    end
    puts
    puts
end

visited = Set.new
heap = MinHeap.new

current = Node.new(0,start,[],0)
visited.add(current.pos)
# heap.add(0, current)
while current.pos != finish
    # print current.path
    # print_path(current.path, maze.dup)
    neighbors = poss_neigh(current.pos,maze)
    visited.add(current.pos)
    # print current.pos
    # puts
    # print neighbors
    # puts
    neighbors.each do |neighbor|
        if !visited.include?(neighbor)
            # visited.add(neighbor)
            dist = current.num + 1
            if heap.lookup[neighbor]
                if heap.lookup[neighbor].num > dist
                    heap.lookup[neighbor].num = dist
                    heap.lookup[neighbor].path = current.path.push(neighbor)
                    heap.bubble_up(heap.lookup[neighbor].i)
                end
            else
                heap.add(dist, neighbor, current.path)
            end
        end
    end
    # debugger
    current = heap.min
    # print heap.inspect
    # puts
    # print current.pos
    # puts
    return -1 unless current
end

# print_path([], maze2)
print_path(current.path, maze)
print heap.heap