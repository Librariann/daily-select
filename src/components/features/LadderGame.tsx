"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Play, RefreshCw } from "lucide-react";

interface Line {
  from: number;
  y: number;
}

interface PathPoint {
  x: number;
  y: number;
}

export function LadderGame() {
  const [players, setPlayers] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);
  const [inputPlayer, setInputPlayer] = useState("");
  const [inputResult, setInputResult] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [paths, setPaths] = useState<number[][]>([]);
  const [currentPath, setCurrentPath] = useState<number | null>(null);
  const [finalResults, setFinalResults] = useState<Map<number, number>>(new Map());
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [pathPoints, setPathPoints] = useState<PathPoint[]>([]);
  const [revealedResults, setRevealedResults] = useState<Set<number>>(new Set());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const addPlayer = () => {
    if (inputPlayer.trim() && players.length < 6) {
      setPlayers([...players, inputPlayer.trim()]);
      setInputPlayer("");
    }
  };

  const addResult = () => {
    if (inputResult.trim() && results.length < players.length) {
      setResults([...results, inputResult.trim()]);
      setInputResult("");
    }
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
    if (results.length > players.length - 1) {
      setResults(results.slice(0, players.length - 1));
    }
  };

  const removeResult = (index: number) => {
    setResults(results.filter((_, i) => i !== index));
  };

  const generateLines = useCallback(() => {
    const newLines: Line[] = [];
    const numPlayers = players.length;
    const rows = 8;
    
    for (let row = 1; row <= rows; row++) {
      const y = row / (rows + 1);
      for (let col = 0; col < numPlayers - 1; col++) {
        if (Math.random() < 0.4) {
          const hasConflict = newLines.some(
            (line) => Math.abs(line.y - y) < 0.05 && Math.abs(line.from - col) <= 1
          );
          if (!hasConflict) {
            newLines.push({ from: col, y });
          }
        }
      }
    }
    
    setLines(newLines);
    return newLines;
  }, [players.length]);

  const calculatePath = useCallback((startIndex: number, lineData: Line[]): number[] => {
    const path: number[] = [startIndex];
    let currentCol = startIndex;
    const sortedLines = [...lineData].sort((a, b) => a.y - b.y);
    
    for (const line of sortedLines) {
      if (line.from === currentCol) {
        currentCol = currentCol + 1;
        path.push(currentCol);
      } else if (line.from === currentCol - 1) {
        currentCol = currentCol - 1;
        path.push(currentCol);
      }
    }
    
    return path;
  }, []);

  const calculatePathPoints = useCallback((playerIndex: number): PathPoint[] => {
    const canvas = canvasRef.current;
    if (!canvas) return [];
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const numPlayers = players.length;
    const colWidth = (width - padding * 2) / (numPlayers - 1);
    
    const points: PathPoint[] = [];
    const sortedLines = [...lines].sort((a, b) => a.y - b.y);
    
    let currentCol = playerIndex;
    let lastY = 20;
    
    points.push({ x: padding + currentCol * colWidth, y: lastY });
    
    for (const line of sortedLines) {
      const lineY = 20 + line.y * (height - 40);
      
      if (line.from === currentCol) {
        points.push({ x: padding + currentCol * colWidth, y: lineY });
        points.push({ x: padding + (currentCol + 1) * colWidth, y: lineY });
        currentCol = currentCol + 1;
        lastY = lineY;
      } else if (line.from === currentCol - 1) {
        points.push({ x: padding + currentCol * colWidth, y: lineY });
        points.push({ x: padding + (currentCol - 1) * colWidth, y: lineY });
        currentCol = currentCol - 1;
        lastY = lineY;
      }
    }
    
    points.push({ x: padding + currentCol * colWidth, y: height - 20 });
    
    return points;
  }, [lines, players.length]);

  const startGame = () => {
    if (players.length < 2 || results.length !== players.length) return;
    
    setIsPlaying(true);
    setShowResults(false);
    setCurrentPath(null);
    setFinalResults(new Map());
    setIsAnimating(false);
    setAnimationProgress(0);
    setPathPoints([]);
    setRevealedResults(new Set());
    
    const newLines = generateLines();
    
    const allPaths: number[][] = [];
    const resultsMap = new Map<number, number>();
    
    for (let i = 0; i < players.length; i++) {
      const path = calculatePath(i, newLines);
      allPaths.push(path);
      resultsMap.set(i, path[path.length - 1]);
    }
    
    setPaths(allPaths);
    setFinalResults(resultsMap);
    
    setTimeout(() => {
      setIsPlaying(false);
      setShowResults(true);
    }, 500);
  };

  const revealPath = (index: number) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    if (currentPath === index) {
      setCurrentPath(null);
      setIsAnimating(false);
      setAnimationProgress(0);
      setPathPoints([]);
      return;
    }
    
    setCurrentPath(index);
    const points = calculatePathPoints(index);
    setPathPoints(points);
    setIsAnimating(true);
    setAnimationProgress(0);
    
    const totalLength = calculateTotalLength(points);
    const duration = 1500;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimationProgress(eased * totalLength);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setRevealedResults(prev => new Set([...prev, index]));
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const calculateTotalLength = (points: PathPoint[]): number => {
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      total += Math.sqrt(dx * dx + dy * dy);
    }
    return total;
  };

  const reset = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setPlayers([]);
    setResults([]);
    setLines([]);
    setShowResults(false);
    setPaths([]);
    setCurrentPath(null);
    setFinalResults(new Map());
    setIsAnimating(false);
    setAnimationProgress(0);
    setPathPoints([]);
    setRevealedResults(new Set());
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || players.length < 2) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const numPlayers = players.length;
    const colWidth = (width - padding * 2) / (numPlayers - 1);
    
    ctx.clearRect(0, 0, width, height);
    
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 3;
    
    for (let i = 0; i < numPlayers; i++) {
      const x = padding + i * colWidth;
      ctx.beginPath();
      ctx.moveTo(x, 20);
      ctx.lineTo(x, height - 20);
      ctx.stroke();
    }
    
    for (const line of lines) {
      const x1 = padding + line.from * colWidth;
      const x2 = padding + (line.from + 1) * colWidth;
      const y = 20 + line.y * (height - 40);
      
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();
    }
    
    if (currentPath !== null && pathPoints.length > 0) {
      ctx.strokeStyle = "#6366f1";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      ctx.beginPath();
      ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
      
      let drawnLength = 0;
      
      for (let i = 1; i < pathPoints.length; i++) {
        const prevPoint = pathPoints[i - 1];
        const currPoint = pathPoints[i];
        const dx = currPoint.x - prevPoint.x;
        const dy = currPoint.y - prevPoint.y;
        const segmentLength = Math.sqrt(dx * dx + dy * dy);
        
        if (drawnLength + segmentLength <= animationProgress) {
          ctx.lineTo(currPoint.x, currPoint.y);
          drawnLength += segmentLength;
        } else {
          const remaining = animationProgress - drawnLength;
          const ratio = remaining / segmentLength;
          const x = prevPoint.x + dx * ratio;
          const y = prevPoint.y + dy * ratio;
          ctx.lineTo(x, y);
          break;
        }
      }
      
      ctx.stroke();
      
      let markerX = pathPoints[0].x;
      let markerY = pathPoints[0].y;
      let accLength = 0;
      
      for (let i = 1; i < pathPoints.length; i++) {
        const prevPoint = pathPoints[i - 1];
        const currPoint = pathPoints[i];
        const dx = currPoint.x - prevPoint.x;
        const dy = currPoint.y - prevPoint.y;
        const segmentLength = Math.sqrt(dx * dx + dy * dy);
        
        if (accLength + segmentLength <= animationProgress) {
          markerX = currPoint.x;
          markerY = currPoint.y;
          accLength += segmentLength;
        } else {
          const remaining = animationProgress - accLength;
          const ratio = remaining / segmentLength;
          markerX = prevPoint.x + dx * ratio;
          markerY = prevPoint.y + dy * ratio;
          break;
        }
      }
      
      ctx.beginPath();
      ctx.arc(markerX, markerY, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#6366f1";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [players.length, lines, currentPath, pathPoints, animationProgress]);

  const isReady = players.length >= 2 && results.length === players.length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">사다리타기</h1>
        <p className="text-slate-500">공정한 사다리 게임으로 결정하세요</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        {!showResults ? (
          <>
            <div className="mb-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  참가자 ({players.length}/6)
                </label>
                <div className="flex gap-2">
                  <Input
                    value={inputPlayer}
                    onChange={(e) => setInputPlayer(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addPlayer()}
                    placeholder="이름 입력"
                    disabled={players.length >= 6}
                    maxLength={10}
                  />
                  <Button 
                    onClick={addPlayer} 
                    disabled={!inputPlayer.trim() || players.length >= 6}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {players.map((player, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700"
                    >
                      {player}
                      <button
                        onClick={() => removePlayer(index)}
                        className="ml-1 rounded-full p-0.5 hover:bg-indigo-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  결과 ({results.length}/{players.length})
                </label>
                <div className="flex gap-2">
                  <Input
                    value={inputResult}
                    onChange={(e) => setInputResult(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addResult()}
                    placeholder="결과 입력"
                    disabled={results.length >= players.length || players.length < 2}
                    maxLength={10}
                  />
                  <Button 
                    onClick={addResult} 
                    disabled={!inputResult.trim() || results.length >= players.length}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700"
                    >
                      {result}
                      <button
                        onClick={() => removeResult(index)}
                        className="ml-1 rounded-full p-0.5 hover:bg-amber-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!isReady && (
              <p className="mb-4 text-center text-sm text-slate-500">
                {players.length < 2
                  ? "최소 2명의 참가자가 필요합니다"
                  : `결과를 ${players.length - results.length}개 더 입력해주세요`}
              </p>
            )}

            <Button
              onClick={startGame}
              disabled={!isReady || isPlaying}
              size="lg"
              className="w-full"
            >
              {isPlaying ? (
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Play className="mr-2 h-5 w-5" />
              )}
              {isPlaying ? "생성 중..." : "사다리 생성"}
            </Button>
          </>
        ) : (
          <>
            <div className="mb-4 flex justify-between">
              {players.map((player, index) => {
                const isRevealed = revealedResults.has(index);
                const isActive = currentPath === index;
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => revealPath(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isAnimating && currentPath !== index}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-500 text-white"
                        : isRevealed
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                    } ${isAnimating && currentPath !== index ? "opacity-50" : ""}`}
                  >
                    {player}
                    {isRevealed && !isActive && " ✓"}
                  </motion.button>
                );
              })}
            </div>

            <div className="relative mb-4">
              <canvas
                ref={canvasRef}
                width={500}
                height={300}
                className="mx-auto block w-full max-w-[500px]"
              />
            </div>

            <div className="mb-6 flex justify-between">
              {results.map((result, index) => {
                const isCurrentResult = currentPath !== null && finalResults.get(currentPath) === index;
                const animationComplete = !isAnimating && currentPath !== null;
                
                return (
                  <motion.div
                    key={index}
                    animate={isCurrentResult && animationComplete ? { 
                      scale: [1, 1.1, 1],
                      transition: { duration: 0.3 }
                    } : {}}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isCurrentResult
                        ? "bg-amber-500 text-white"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {result}
                    {isCurrentResult && animationComplete && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-1"
                      >
                        ← {players[currentPath]}
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="mb-4 rounded-xl bg-slate-50 p-4">
              <p className="mb-2 text-center text-sm font-medium text-slate-600">
                {revealedResults.size === 0 
                  ? "이름을 클릭해서 결과를 확인하세요" 
                  : `확인된 결과 (${revealedResults.size}/${players.length})`}
              </p>
              <div className="flex flex-wrap justify-center gap-2 min-h-[32px]">
                {Array.from(revealedResults).sort((a, b) => a - b).map((playerIdx) => {
                  const resultIdx = finalResults.get(playerIdx);
                  if (resultIdx === undefined) return null;
                  
                  return (
                    <motion.div
                      key={playerIdx}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="rounded-full bg-white px-3 py-1 text-sm shadow-sm"
                    >
                      <span className="font-medium text-indigo-600">{players[playerIdx]}</span>
                      <span className="mx-1 text-slate-400">→</span>
                      <span className="font-medium text-amber-600">{results[resultIdx]}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={startGame} size="lg" className="flex-1" disabled={isAnimating}>
                <RefreshCw className="mr-2 h-5 w-5" />
                다시 하기
              </Button>
              <Button onClick={reset} size="lg" variant="outline" className="flex-1" disabled={isAnimating}>
                새로 만들기
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
