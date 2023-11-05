import React, { useCallback, useRef } from 'react'

interface ChannelCreateBtnProps {
  onClick: () => void;
}

const ChannelCreateBtn: React.FC<ChannelCreateBtnProps> = ({onClick}) => {

  return (
    <div>
      <button
        onClick={onClick}
        className="flex w-40 h-8 rounded-xl items-center justify-center bg-heading-fill hover:bg-[#111417] text-main-text text-xl font-saira-condensed border-b border-main-yellow"
      >
        Create Channel
      </button>
    </div>
  );
}

export default ChannelCreateBtn;
