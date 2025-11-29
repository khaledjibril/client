import React from "react";

const OverviewCard = ({ title, icon, number }) => {
  return (
    <div className="bg-background-accent px-10 py-10 flex flex-col gap-8 drop-shadow-sm rounded-xl">
      <div className="flex items-center justify-between text-text-foreground">
        <p className="capitalize font-semibold text-2xl sm:text-3xl">{title}</p>
        <p className="text-muted-foreground text-2xl">{icon}</p>
      </div>
      <p className="text-text-foreground text-3x2 sm:text-4xl font-bold">
        {number}
      </p>
    </div>
  );
};

export default OverviewCard;