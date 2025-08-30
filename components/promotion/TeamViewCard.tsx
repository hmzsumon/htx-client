"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetActivePromotionDataQuery } from "@/redux/features/auth/authApi";
import { SquareArrowOutUpRight, Users } from "lucide-react";
import Link from "next/link";

const items = [
  {
    id: 1,
    team: "Register",
    inactive: 10,
    active: 0,
    link: "#",
  },
  {
    id: 2,
    team: 'Team "A"',
    inactive: 0,
    active: 250,
    link: "#",
  },
  {
    id: 3,
    team: 'Team "B"',
    inactive: 0,
    active: 250,
    link: "#",
  },
  {
    id: 4,
    team: 'Team "C"',
    inactive: 0,
    active: 250,
    link: "#",
  },
];

export function TeamViewCard() {
  const { data, isLoading } = useGetActivePromotionDataQuery(undefined);
  const { activePromotionData: users } = data || {};
  console.log(users, "users");

  const items = [
    {
      id: 1,
      team: "Register",
      inactive: users?.team_inactive_users,
      active: users?.team_active_users,
      link: "register-users?team=register",
    },
    {
      id: 2,
      team: 'Team "A"',
      inactive: users?.level_1_inactive_users,
      active: users?.level_1_active_users,

      link: "register-users?team=team_a",
    },
    {
      id: 3,
      team: 'Team "B"',
      inactive: users?.level_2_inactive_users,
      active: users?.level_2_active_users,
      link: "register-users?team=team_b",
    },
    {
      id: 4,
      team: 'Team "C"',
      inactive: users?.level_3_inactive_users,
      active: users?.level_3_active_users,
      link: "register-users?team=team_c",
    },
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className=" text-gray-50 font-bold">Team</TableHead>
          <TableHead className=" text-gray-50 font-bold text-right">
            Inactive
          </TableHead>
          <TableHead className=" text-gray-50 font-bold text-right">
            Active
          </TableHead>
          <TableHead className=" text-gray-50 font-bold text-right">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium text-xs">{item.team}</TableCell>
            <TableCell className=" text-right text-red-500  ">
              <span className="flex items-center gap-1  justify-end ">
                {item.inactive}
                <Users size={15} />
              </span>
            </TableCell>
            <TableCell className=" text-right text-green-500  ">
              <span className="flex items-center gap-1  justify-end">
                {item.active}
                <Users size={15} />
              </span>
            </TableCell>
            <TableCell>
              <Link href={item.link} className=" flex justify-end">
                <SquareArrowOutUpRight size={15} />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
