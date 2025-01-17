"use client";
import React, { useState } from "react";
import { FaChevronLeft, FaPen } from "react-icons/fa";

const SheetBox = () => {
  const [right, setRight] = useState(true);

  const handleMoveToLeft = () => {
    setRight(!right);
  };
  return (
    <div
      className={`${right ? "overflow-hidden" : ""} absolute top-56 right-0`}
    >
      <div
        className={`${
          right ? "-right-48 opacity-0" : "right-0 opacity-100"
        } border w-40 h-40 rounded-l-xl bg-white relative transition-all duration-700
           p-2 flex flex-col items-end `}
      >
        <h1 className="text-lg font-semibold mb-2">Options</h1>
        <div
          onClick={() => handleMoveToLeft(!right)}
          className="flex my-1 gap-x-2 text-base items-center font-semibold cursor-pointer"
        >
          <FaPen />
          Pen
        </div>
        <div
          onClick={() => handleMoveToLeft(!right)}
          className="flex my-1 gap-x-2 text-base items-center font-semibold cursor-pointer"
        >
          <FaPen />
          Pen
        </div>
        <div
          onClick={() => handleMoveToLeft(!right)}
          className="flex my-1 gap-x-2 text-base items-center font-semibold cursor-pointer"
        >
          <FaPen />
          Pen
        </div>
      </div>
      <button
        onClick={handleMoveToLeft}
        className={`${
          right ? "-right-2 pr-1" : " -left-2"
        } transition-all duration-1000 delay-75  top-1/2 transform -translate-y-1/2 absolute bg-white text-neutral-500 text-xl h-5 w-5 rotate-[-45deg] rounded-br-md`}
      >
        <FaChevronLeft className="rotate-[45deg]" />
      </button>
      {/* <Sheet>
          <SheetTrigger asChild>
            <Button variant="new">
              <FaChevronRight className="text-sm" />
            </Button>
            
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet> */}
    </div>
  );
};

export default SheetBox;
