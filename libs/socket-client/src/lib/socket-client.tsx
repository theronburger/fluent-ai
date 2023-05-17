import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { store } from '@tool-ai/state';

/* eslint-disable-next-line */
export interface SocketClientProps {
  userId: string;
  userName: string;
  nodes: any[];
  edges: any[];
  onChangeFlow: (e: any) => void;
}

export function SocketClient(props: SocketClientProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });
  const [collabUser, setCollabUser] = useState({
    id: '',
    name: '',
  });

  useEffect(() => {
    const socket = io('http://localhost:3000'); // replace with server URL
    setSocket(socket);
    socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });
    // Clean up the socket connection on component unmount
    return () => {
      socket.off('connect');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('mouse', (data: string) => {
        const extract = JSON.parse(data);
        const activeTabId = store.getState().flowTab.flowTabs.activeId;
        if (extract.userId !== props.userId && extract.tabId === activeTabId) {
          setIsCollaborating(true);
          setMousePos({ x: extract.x, y: extract.y });
          setCollabUser({ id: extract.userId, name: extract.userName });
          props.onChangeFlow({ nodes: extract.nodes, edges: extract.edges });
        } else {
          setIsCollaborating(false);
        }
      });

      // Clean up the socket connection on component unmount
      return () => {
        socket.off('mouse');
      };
    }
  }, [props, socket]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (socket) {
        const activeTabId = store.getState().flowTab.flowTabs.activeId;

        socket.emit(
          'mouse',
          JSON.stringify({
            x: event.clientX,
            y: event.clientY,
            userName: props.userName,
            userId: props.userId,
            tabId: activeTabId,
            nodes: props.nodes,
            edges: props.edges,
          })
        );
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [socket, props]);

  if (isCollaborating) {
    return (
      <div>
        <div
          style={{
            top: mousePos.y,
            left: mousePos.x,
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: 'orange',
            width: 7,
            height: 7,
            borderRadius: 10,
          }}
        ></div>
        <span
          style={{
            top: mousePos.y + 7,
            left: mousePos.x + 7,
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: 'orange',
            padding: 3,
            borderRadius: 10,
            fontSize: '0.7rem',
            overflow: 'hidden',
          }}
        >
          {collabUser.name}
        </span>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default SocketClient;
