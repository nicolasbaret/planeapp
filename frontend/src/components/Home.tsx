import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Typography, ToggleButtonGroup, ToggleButton, IconButton, Paper, Slider, Stack } from '@mui/material';
import { Brush, FormatColorFill, Delete, Edit, PlayArrow, Pause, Add, Remove } from '@mui/icons-material';

const COLORS = ['#000000', '#FF5733', '#33FF57', '#3357FF', '#FFD700', '#FF00FF', '#00FFFF', '#FFFFFF'];
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 540;

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(10);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');

  // Flipbook state
  const [frames, setFrames] = useState<string[]>([]); // base64 images
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(300); // ms per frame

  // Initialize first frame
  useEffect(() => {
    if (frames.length === 0) {
      setFrames([blankFrame()]);
      setCurrentFrame(0);
    }
  }, [frames.length]);

  // Draw current frame on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && frames.length > 0) {
      const ctx = canvas.getContext('2d');
      const img = new window.Image();
      img.src = frames[currentFrame];
      img.onload = () => {
        ctx!.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx!.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      };
    }
  }, [currentFrame, frames]);

  // Animation playback
  useEffect(() => {
    if (!isPlaying || frames.length < 2) return;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, playSpeed);
    return () => clearInterval(interval);
  }, [isPlaying, frames.length, playSpeed]);

  // Helper to create blank frame
  function blankFrame() {
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext('2d');
    ctx!.fillStyle = '#FFFFFF';
    ctx!.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    return canvas.toDataURL();
  }

  // Save current canvas to frame
  const saveFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const newFrames = [...frames];
    newFrames[currentFrame] = canvas.toDataURL();
    setFrames(newFrames);
  };

  // Add new frame
  const addFrame = () => {
    saveFrame();
    const newFrames = [...frames];
    newFrames.splice(currentFrame + 1, 0, blankFrame());
    setFrames(newFrames);
    setCurrentFrame(currentFrame + 1);
  };

  // Delete current frame
  const deleteFrame = () => {
    if (frames.length <= 1) return;
    const newFrames = frames.filter((_, idx) => idx !== currentFrame);
    setFrames(newFrames);
    setCurrentFrame(Math.max(0, currentFrame - 1));
  };

  // Go to previous frame
  const prevFrame = () => {
    saveFrame();
    setCurrentFrame((prev) => Math.max(0, prev - 1));
  };

  // Go to next frame
  const nextFrame = () => {
    saveFrame();
    setCurrentFrame((prev) => Math.min(frames.length - 1, prev + 1));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    draw(e);
  };

  const handlePointerUp = () => {
    setDrawing(false);
    saveFrame();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    draw(e);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx!.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    ctx!.beginPath();
    ctx!.arc(x, y, brushSize, 0, 2 * Math.PI);
    ctx!.fillStyle = tool === 'eraser' ? 'rgba(0,0,0,1)' : brushColor;
    ctx!.shadowColor = tool === 'eraser' ? '#fff' : brushColor;
    ctx!.shadowBlur = 2;
    ctx!.fill();
    ctx!.shadowBlur = 0;
  };

  const handleColorChange = (color: string) => {
    setBrushColor(color);
    setTool('brush');
  };

  const handleToolChange = (_: React.MouseEvent<HTMLElement>, newTool: 'brush' | 'eraser') => {
    if (newTool) setTool(newTool);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx!.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx!.fillStyle = '#FFFFFF';
      ctx!.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      saveFrame();
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 4, boxSizing: 'border-box', overflow: 'auto' }}>
      <Typography variant="h3" fontWeight={700} color="#222" gutterBottom sx={{ textShadow: '0 2px 8px #b3b3b3' }}>
        Flipbook Creator
      </Typography>
      <Paper elevation={6} sx={{ p: 3, borderRadius: 6, background: 'linear-gradient(135deg, #f0f4ff 0%, #e3e3e3 100%)', mb: 3, maxWidth: CANVAS_WIDTH + 40, width: '100%', mx: 'auto' }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
          <Button variant="outlined" startIcon={<Remove />} onClick={prevFrame} disabled={currentFrame === 0}>Prev</Button>
          <Typography>Frame {currentFrame + 1} / {frames.length}</Typography>
          <Button variant="outlined" startIcon={<Add />} onClick={addFrame}>Add Frame</Button>
          <Button variant="outlined" color="error" startIcon={<Delete />} onClick={deleteFrame} disabled={frames.length === 1}>Delete Frame</Button>
          <Button variant="outlined" onClick={nextFrame} disabled={currentFrame === frames.length - 1}>Next</Button>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
          <Button variant="contained" color={isPlaying ? 'warning' : 'primary'} startIcon={isPlaying ? <Pause /> : <PlayArrow />} onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Typography>Speed</Typography>
          <Slider min={100} max={1000} step={50} value={playSpeed} onChange={(_, val) => setPlaySpeed(Number(val))} sx={{ width: 120 }} />
          <Typography>{playSpeed} ms/frame</Typography>
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <ToggleButtonGroup
            value={tool}
            exclusive
            onChange={handleToolChange}
            aria-label="tool selector"
            sx={{ bgcolor: '#fff', borderRadius: 2 }}
          >
            <ToggleButton value="brush" aria-label="brush" sx={{ px: 3, py: 1, fontWeight: 600 }}>
              <Brush sx={{ mr: 1 }} /> Brush
            </ToggleButton>
            <ToggleButton value="eraser" aria-label="eraser" sx={{ px: 3, py: 1, fontWeight: 600 }}>
              <Edit sx={{ mr: 1 }} /> Eraser
            </ToggleButton>
          </ToggleButtonGroup>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {COLORS.map((color) => (
              <IconButton
                key={color}
                onClick={() => handleColorChange(color)}
                sx={{
                  backgroundColor: color,
                  border: brushColor === color ? '3px solid #222' : '2px solid #fff',
                  width: 36,
                  height: 36,
                  boxShadow: brushColor === color ? '0 0 8px #222' : '0 1px 4px #aaa',
                  transition: 'all 0.2s',
                }}
              >
                <FormatColorFill sx={{ color: color === '#FFFFFF' ? '#222' : '#fff' }} />
              </IconButton>
            ))}
          </Box>
          <Button variant="contained" color="error" startIcon={<Delete />} onClick={handleClear} sx={{ fontWeight: 600, px: 3, py: 1, borderRadius: 2 }}>
            Clear
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography sx={{ minWidth: 100 }}>Brush Size</Typography>
          <Slider
            min={2}
            max={32}
            value={brushSize}
            onChange={(_, val) => setBrushSize(Number(val))}
            sx={{ width: 200 }}
          />
          <Typography sx={{ minWidth: 40 }}>{brushSize}px</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{
              border: '3px solid #222',
              borderRadius: 16,
              boxShadow: '0 4px 24px #b3b3b3',
              cursor: tool === 'eraser' ? 'crosshair' : 'pointer',
              background: '#fff',
              margin: 'auto',
              display: 'block',
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerOut={handlePointerUp}
            onPointerMove={handlePointerMove}
          />
        </Box>
      </Paper>
      <Typography variant="body2" color="#888" sx={{ mt: 2 }}>
        © 2025 Flipbook Creator. Made with AI.
      </Typography>
    </Box>
  );
};

export default Home;
