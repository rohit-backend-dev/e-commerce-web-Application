import React from "react";
import Wheel from "../gamefy/Wheel";

const SpinWheelPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-yellow-50 to-pink-100">
      <Wheel onClose={() => window.history.back()} />
    </div>
  );
};

export default SpinWheelPage;
