import {createContext, type ReactNode, useContext, useRef, useState} from "react";

interface PlayerPreviewContextType {
}

export const PlayerPreviewContext = createContext<PlayerPreviewContextType | undefined>(undefined);

export const PlayerPreviewProvider = ({ children }: { children: ReactNode }) => {
	return (
		<PlayerPreviewContext.Provider
			value={{
			}}
		>
			{children}
		</PlayerPreviewContext.Provider>
	)
}

export const usePlayerPreview = () => {
	const context = useContext(PlayerPreviewContext);
	if (!context)
		throw new Error('usePlayerPreview sólo puede ser usado dentro de PlayerPreviewContext');
	return context;
}