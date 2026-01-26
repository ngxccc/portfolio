"use client";

const Background3D = () => {
  return (
    <>
      <div className="canvas-container" />
      <div className="fixed inset-0 -z-10">
        <div className="gradient-grid absolute inset-0" />
      </div>
    </>
  );
};

export default Background3D;
