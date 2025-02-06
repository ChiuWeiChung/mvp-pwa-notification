'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Rnd } from 'react-rnd';

// 每個 Rnd Item 的資料結構
type RndItem = {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
};

const baseStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
};

function DndContainer() {
  const [rndItems, setRndItems] = useState<RndItem[]>([]);

  // 新增一個 Rnd
  const handleAddRndWindow = () => {
    // 隨機的 x、y
    const randomX = Math.floor(Math.random() * window.innerWidth * 0.5);
    const randomY = Math.floor(Math.random() * window.innerHeight * 0.5);

    // 取得現有 Rnd 裡最大的 zIndex，若沒有任何 item，給 2000 當基底
    const maxZ = rndItems.reduce((acc, item) => {
      return item.zIndex > acc ? item.zIndex : acc;
    }, 1999);

    // 新增新的 item，zIndex = maxZ + 1
    setRndItems((prev) => [
      ...prev,
      {
        x: randomX,
        y: randomY,
        width: 200,
        height: 100,
        zIndex: maxZ + 1,
      },
    ]);
  };

  // 當 Rnd 被點擊 (mouseDown) 時，將其 zIndex 提升為最大
  const handleBringToFront = (index: number) => {
    // 先取得目前所有 item 中最大的 zIndex
    const maxZ = rndItems.reduce((acc, item) => {
      return item.zIndex > acc ? item.zIndex : acc;
    }, 1999);

    setRndItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          // 被點擊的那一個，zIndex = maxZ + 1
          return {
            ...item,
            zIndex: maxZ + 1,
          };
        }
        return item;
      }),
    );
  };

  console.log('rndItems', rndItems);

  return (
    <div>
      <Button onClick={handleAddRndWindow}>Add Rnd Window</Button>

      {rndItems.map((item, index) => (
        <Rnd
          key={index}
          default={{
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
          }}
          // 動態注入 zIndex 到 style 裡
          style={{ ...baseStyle, zIndex: item.zIndex }}
          dragHandleClassName="meow"
          bounds="window"
          // 當按下滑鼠時，就把該 Rnd 的 zIndex 拉到最高
          onMouseDown={() => handleBringToFront(index)}
        >
          <div>
            <div className="meow" style={{ cursor: 'pointer' }}>
              Drag Me
            </div>
            <div>wolf</div>
            <div>wolf</div>
            <div>wolf</div>
            <div>wolf</div>
            <div>wolf</div>
          </div>
        </Rnd>
      ))}
    </div>
  );
}

export default DndContainer;
