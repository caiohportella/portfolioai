"use client";

import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { createSession } from "@/app/actions/create-session";
import type { CHAT_PROFILE_QUERYResult } from "@/sanity.types";
import { useSidebar } from "../ui/sidebar";

export function Chat({
  profile,
}: {
  profile: CHAT_PROFILE_QUERYResult | null;
}) {
  const { toggleSidebar } = useSidebar();
  // Generate greeting based on available profile data
  const getGreeting = () => {
    if (!profile?.firstName) {
      return "Olá! Me pergunte qualquer coisa sobre meu trabalho, experiência ou projetos.";
    }

    // The .filter(Boolean) removes all falsy values from the array, so if the firstName or lastName is not set, it will be removed
    const fullName = [profile.firstName, profile.lastName]
      .filter(Boolean)
      .join(" ");

    return `Olá! Eu sou ${fullName}. Me pergunte qualquer coisa sobre meu trabalho, experiência ou projetos.`;
  };

  const { control } = useChatKit({
    api: {
      getClientSecret: async (_existingSecret) => {
        // Called on initial load and when session needs refresh, we dont actuall use the existing secret as userId is managed by Clerk
        return createSession();
      },
    },
    // https://chatkit.studio/playground
    theme: {},
    header: {
      title: {
        text: `Conversar com ${profile?.firstName || "Mim"} `,
      },
      leftAction: {
        icon: "close",
        onClick: () => {
          toggleSidebar();
        },
      },
    },
    startScreen: {
      greeting: getGreeting(),
      prompts: [
        {
          icon: "suitcase",
          label: "Qual é sua experiência?",
          prompt:
            "Me conte sobre sua experiência profissional e cargos anteriores",
        },
        {
          icon: "square-code",
          label: "Quais habilidades você tem?",
          prompt:
            "Quais tecnologias e linguagens de programação você domina?",
        },
        {
          icon: "cube",
          label: "O que você já construiu?",
          prompt: "Mostre-me alguns dos seus projetos mais interessantes",
        },
        {
          icon: "profile",
          label: "Quem é você?",
          prompt: "Conte-me mais sobre você e sua trajetória",
        },
      ],
    },
    composer: {
      models: [
        {
          id: "crisp",
          label: "Conciso",
          description: "Conciso e factual",
        },
        {
          id: "clear",
          label: "Claro",
          description: "Focado e útil",
        },
        {
          id: "chatty",
          label: "Conversador",
          description: "Companheiro conversacional",
        },
      ],
      placeholder: "Tire sua dúvida..."
    },

    disclaimer: {
      text: "Aviso: Este é meu gêmeo alimentado por IA. Pode não ser 100% preciso e deve ser verificado quanto à precisão.",
    },
  });

  return <ChatKit control={control} className="h-full w-full z-50" />;
}

export default Chat;
