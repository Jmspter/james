"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type LegalType = "privacy" | "terms";

interface LegalModalProps {
    type: LegalType;
    isOpen: boolean;
    onClose: () => void;
}

const legalContent = {
    privacy: {
        title: "Política de Privacidade",
        lastUpdated: "05 de Dezembro de 2025",
        sections: [
            {
                title: "1. Informações que Coletamos",
                content: `Coletamos informações que você nos fornece diretamente, como nome e email quando você entra em contato através do formulário de contato ou se inscreve na newsletter. Também coletamos automaticamente algumas informações sobre seu dispositivo e uso do site através de cookies e tecnologias similares.`
            },
            {
                title: "2. Como Usamos suas Informações",
                content: `Utilizamos as informações coletadas para:
• Responder às suas mensagens e solicitações
• Enviar atualizações sobre novos artigos do blog (se você se inscreveu)
• Melhorar a experiência do usuário no site
• Analisar o tráfego e uso do site de forma agregada`
            },
            {
                title: "3. Compartilhamento de Dados",
                content: `Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Podemos compartilhar dados com provedores de serviços que nos ajudam a operar o site (como serviços de hospedagem e analytics), sempre sob acordos de confidencialidade.`
            },
            {
                title: "4. Cookies",
                content: `Este site utiliza cookies essenciais para funcionamento e cookies de analytics para entender como os visitantes interagem com o site. Você pode configurar seu navegador para recusar cookies, mas algumas funcionalidades podem não funcionar corretamente.`
            },
            {
                title: "5. Segurança dos Dados",
                content: `Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui criptografia SSL/TLS para todas as comunicações.`
            },
            {
                title: "6. Seus Direitos",
                content: `Você tem o direito de:
• Acessar os dados pessoais que temos sobre você
• Solicitar a correção de dados incorretos
• Solicitar a exclusão de seus dados
• Retirar seu consentimento a qualquer momento

Para exercer esses direitos, entre em contato pelo email: jamespeter1006@gmail.com`
            },
            {
                title: "7. Alterações nesta Política",
                content: `Podemos atualizar esta política periodicamente. Recomendamos que você revise esta página regularmente para se manter informado sobre como protegemos suas informações.`
            }
        ]
    },
    terms: {
        title: "Termos de Serviço",
        lastUpdated: "05 de Dezembro de 2025",
        sections: [
            {
                title: "1. Aceitação dos Termos",
                content: `Ao acessar e usar este site, você concorda em cumprir estes Termos de Serviço. Se você não concordar com qualquer parte destes termos, não deve usar o site.`
            },
            {
                title: "2. Uso do Site",
                content: `Este site é um portfólio pessoal e blog técnico. O conteúdo é fornecido apenas para fins informativos e educacionais. Você concorda em usar o site apenas para fins legais e de maneira que não infrinja os direitos de terceiros.`
            },
            {
                title: "3. Propriedade Intelectual",
                content: `Todo o conteúdo deste site, incluindo textos, código, gráficos, logos e imagens, é protegido por direitos autorais e outras leis de propriedade intelectual. Você pode:
• Ler e compartilhar links para o conteúdo
• Usar trechos de código apresentados em artigos para fins educacionais

Você não pode:
• Reproduzir o conteúdo integralmente sem permissão
• Usar o conteúdo para fins comerciais sem autorização`
            },
            {
                title: "4. Conteúdo do Blog",
                content: `Os artigos e tutoriais são fornecidos "como estão". Embora nos esforcemos para manter a precisão, não garantimos que todo o conteúdo esteja atualizado ou livre de erros. Você é responsável por testar e validar qualquer código ou técnica antes de usar em produção.`
            },
            {
                title: "5. Links Externos",
                content: `Este site pode conter links para sites de terceiros. Não somos responsáveis pelo conteúdo, políticas de privacidade ou práticas de sites externos. A inclusão de links não implica endosso.`
            },
            {
                title: "6. Limitação de Responsabilidade",
                content: `Em nenhuma circunstância seremos responsáveis por danos diretos, indiretos, incidentais ou consequenciais resultantes do uso ou incapacidade de usar este site ou seu conteúdo.`
            },
            {
                title: "7. Modificações",
                content: `Reservamos o direito de modificar estes termos a qualquer momento. Alterações entram em vigor imediatamente após a publicação. O uso continuado do site após alterações constitui aceitação dos novos termos.`
            },
            {
                title: "8. Contato",
                content: `Para dúvidas sobre estes Termos de Serviço, entre em contato pelo email: jamespeter1006@gmail.com`
            }
        ]
    }
};

export default function LegalModal({ type, isOpen, onClose }: LegalModalProps) {
    const content = legalContent[type];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === "Escape") onClose();
            };
            window.addEventListener("keydown", handleEsc);
            return () => {
                document.body.style.overflow = "unset";
                window.removeEventListener("keydown", handleEsc);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                onClick={onClose}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-bg-main/80 backdrop-blur-xl" />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 40 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-3xl bg-bg-surface/95 backdrop-blur-2xl border border-white/10 shadow-2xl"
                >
                    {/* Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/10 bg-bg-surface/95 backdrop-blur-xl">
                        <div>
                            <h2 className="text-2xl font-heading font-bold text-text-main">
                                {content.title}
                            </h2>
                            <p className="text-sm text-text-muted mt-1">
                                Última atualização: {content.lastUpdated}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-bg-main/50 border border-white/10 text-text-muted hover:text-text-main hover:bg-primary/20 transition-all duration-300"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="overflow-y-auto max-h-[calc(85vh-88px)] p-6 space-y-8 custom-scrollbar">
                        {content.sections.map((section, index) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="space-y-3"
                            >
                                <h3 className="text-lg font-heading font-semibold text-text-main">
                                    {section.title}
                                </h3>
                                <p className="text-text-muted leading-relaxed whitespace-pre-line">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}
