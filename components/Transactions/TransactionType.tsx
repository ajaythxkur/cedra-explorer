'use client'
import { TransactionResponseType } from "@cedra-labs/ts-sdk";
import { FaRegStopCircle } from "react-icons/fa";
import { IoFlagOutline, IoSwapHorizontalOutline } from "react-icons/io5";
import { LuArrowRightFromLine, LuBox } from "react-icons/lu";
import { MdOutlineCheckCircleOutline, MdQuestionMark } from "react-icons/md";
import { PiClockClockwiseFill } from "react-icons/pi";

type TransactionTypeProps = {
    type: string;
}

export function TableTransactionType({ type }: TransactionTypeProps) {
    return (
        `${getTypeIcon(type)}`
    )
}

function getTypeIcon(type: string) {
  switch (type) {
    case TransactionResponseType.BlockMetadata:
      return <LuBox />;
    case TransactionResponseType.Genesis:
      return <LuArrowRightFromLine />
    case TransactionResponseType.User:
      return <IoSwapHorizontalOutline />
    case TransactionResponseType.Pending:
      return <PiClockClockwiseFill />
    case TransactionResponseType.StateCheckpoint:
      return <IoFlagOutline />;
    case TransactionResponseType.Validator:
      return <MdOutlineCheckCircleOutline />
    case TransactionResponseType.BlockEpilogue:
      return <FaRegStopCircle />;
    default:
      return <MdQuestionMark />
  }
}