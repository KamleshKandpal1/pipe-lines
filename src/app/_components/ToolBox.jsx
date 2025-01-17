"use client";
import React, { useState } from "react";
import { FaChevronRight, FaPen } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ToolBox = () => {
  const [left, setLeft] = useState(true);

  const handleMoveToLeft = () => {
    setLeft(!left);
  };

  return (
    <div className={`${left ? "overflow-hidden" : ""} absolute top-56`}>
      <div
        className={`${
          left ? "-left-48 opacity-0" : "left-0 opacity-100"
        } border w-40 h-40 rounded-r-xl bg-white relative transition-all duration-700
         p-2 `}
      >
        <h1 className="text-lg font-semibold mb-2">Options</h1>
        <div
          onClick={() => handleMoveToLeft(!left)}
          className="flex my-1 gap-x-2 text-base items-center font-semibold cursor-pointer"
        >
          <FaPen />
          Pen
        </div>
        <div
          onClick={() => handleMoveToLeft(!left)}
          className="flex my-1 gap-x-2 text-base items-center font-semibold cursor-pointer"
        >
          <FaPen />
          Pen
        </div>
        <div
          onClick={() => handleMoveToLeft(!left)}
          className="flex my-1 gap-x-2 text-base items-center font-semibold cursor-pointer"
        >
          <FaPen />
          Pen
        </div>
      </div>
      <button
        onClick={handleMoveToLeft}
        className={`${
          left ? "-left-2 pr-1" : " -right-2"
        } transition-all duration-1000 delay-75  top-1/2 transform -translate-y-1/2 absolute bg-white text-neutral-500 text-xl h-5 w-5 rotate-[-45deg] rounded-br-md`}
      >
        <FaChevronRight className="rotate-[45deg]" />
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

export default ToolBox;
