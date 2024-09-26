import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { ItemType } from '../types'; // Adjust the import based on your project structure

type TrashDropZoneProps = {
  onDrop: (item: ItemType) => void; // Function to handle the drop action
};

const TrashDropZone: React.FC<TrashDropZoneProps> = ({ onDrop }) => {
  const [{ isOver }, drop] = Droppable({
    accept: 'ITEM', // Specify the type of items that can be dropped here
    drop: (item: ItemType) => {
      if (item) {
        onDrop(item); // Call the onDrop function passed as a prop
      }
    },
    canDrop: (item: ItemType) => {
      return true; // Optionally implement logic to determine if drop is allowed
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className={`trash-drop-zone ${isOver ? 'active' : ''}`}>
      {isOver ? 'Release to delete' : 'Drag here to delete'}
    </div>
  );
};

export default TrashDropZone;
