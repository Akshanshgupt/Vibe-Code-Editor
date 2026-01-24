// import { deleteProjectById, duplicateProjectById, editProjectById, getAllPlaygroundForUser } from "@/modules/dashboard/actions";
// import AddNewButton from "@/modules/dashboard/components/add-new";
// import AddRepo from "@/modules/dashboard/components/add-repo";
// import EmptyState from "@/modules/dashboard/components/empty-state";
// import ProjectTable from "@/modules/dashboard/components/project-table";
//import React from "react";

// const Page = async () => {
//   const playgrounds = await getAllPlaygroundForUser();
//   console.log("Playgrounds:", playgrounds);
//   return (
//     <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
//         <AddNewButton />
//         <AddRepo />
//       </div>

//       <div className="mt-10 flex flex-col justify-center items-center w-full">
//         {playgrounds && playgrounds.length === 0 ? (
//           <EmptyState />
//         ) : (
          
//           // <ProjectTable
//           //   projects={playgrounds || []}
//           //   onDeleteProject={deleteProjectById}
//           //   onUpdateProject={editProjectById}
//           //   onDuplicateProject={duplicateProjectById}
//           // />
//           <ProjectTable
//   projects={playgrounds || []}
//   onDeleteProject={deleteProjectById as (id: string) => Promise<unknown>}
//   onUpdateProject={editProjectById as (
//     id: string,
//     data: { title: string; description: string | null }
//   ) => Promise<unknown>}
//   onDuplicateProject={duplicateProjectById as (id: string) => Promise<unknown>}
// />

//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;

import {
  deleteProjectById,
  duplicateProjectById,
  editProjectById,
  getAllPlaygroundForUser,
} from "@/modules/dashboard/actions";

import AddNewButton from "@/modules/dashboard/components/add-new";
import AddRepo from "@/modules/dashboard/components/add-repo";
import EmptyState from "@/modules/dashboard/components/empty-state";
import ProjectTable from "@/modules/dashboard/components/project-table";

const Page = async () => {
  // 🔴 Raw data from DB / server action
  const playgroundsRaw = await getAllPlaygroundForUser();

  // ✅ NORMALIZE DATA (THIS WAS THE REAL BUG)
  const playgrounds = (playgroundsRaw || []).map((p) => ({
  ...p,
  description: p.description ?? "", // 🔥 ALWAYS STRING
}));


  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AddNewButton />
        <AddRepo />
      </div>

      <div className="mt-10 flex flex-col justify-center items-center w-full">
        {playgrounds.length === 0 ? (
          <EmptyState />
        ) : (
          <ProjectTable
            projects={playgrounds}
            onDeleteProject={deleteProjectById}
            onUpdateProject={editProjectById}
            onDuplicateProject={duplicateProjectById}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
