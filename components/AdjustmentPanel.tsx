/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { SparkleIcon, UpscaleIcon, ColorizeIcon } from './icons';

interface AdjustmentPanelProps {
  onApplyAdjustment: (prompt: string) => void;
  onEnhanceQuality: () => void;
  onUpscaleImage: () => void;
  onColorizeImage: () => void;
  isLoading: boolean;
}

const AdjustmentPanel: React.FC<AdjustmentPanelProps> = ({ onApplyAdjustment, onEnhanceQuality, onUpscaleImage, onColorizeImage, isLoading }) => {
  const [selectedPresetPrompt, setSelectedPresetPrompt] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [blurIntensity, setBlurIntensity] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(0);
  const [vignetteIntensity, setVignetteIntensity] = useState<number>(0);
  const [vignetteColor, setVignetteColor] = useState<'black' | 'white'>('black');

  const presets = [
    // Technical Enhancements
    { name: 'Enhance Details', prompt: 'Subtly enhance the sharpness and micro-contrast of the image to bring out fine details in textures like fabric, foliage, or architecture. The result should be crisp but avoid any artificial-looking halos or over-sharpening.' },
    { name: 'Increase Contrast', prompt: 'Increase the overall contrast for a more dynamic and punchy image. Deepen the blacks and brighten the whites, ensuring that detail is preserved in both the darkest and brightest areas of the image without clipping.' },
    { name: 'Soften Portrait', prompt: 'Apply a gentle, flattering softening effect suitable for portraits. Subtly reduce the appearance of fine lines and skin texture imperfections while preserving key details like eyes and hair sharpness, creating a dreamy, ethereal quality.' },
    { name: 'Studio Light', prompt: "Realistically add a professional studio lighting setup. Create a main key light to sculpt the subject's features, a soft fill light to reduce harsh shadows, and a subtle rim light to separate the subject from the background, resulting in a dramatic, high-quality portrait look." },
    // Color Grading
    { name: 'Golden Hour Glow', prompt: "Bathe the entire image in the soft, warm, diffused light of the 'golden hour'. Introduce rich golden, yellow, and orange hues into the highlights, and create long, soft shadows. The overall mood should be dreamy, serene, and deeply atmospheric." },
    { name: 'Cinematic Teal & Orange', prompt: "Apply a professional cinematic color grade. Shift the shadows and darker midtones towards a cool teal or cyan color, while pushing the highlights and skin tones towards a warm orange or yellow to create a polished, high-impact, modern movie look." },
    { name: 'Cool Blue Tones', prompt: 'Adjust the color grade to give the image a cool, cinematic mood. Introduce subtle blue and cyan tones, particularly into the shadows and midtones, while keeping skin tones looking natural. This should create a modern, dramatic, or somber feel.' },
    { name: 'Vintage Warmth', prompt: 'Create a convincing vintage film look. Shift the colors towards warm yellow and amber tones, slightly fade the blacks to reduce overall contrast, and introduce a hint of magenta in the shadows, mimicking the look of aged photographic paper.' },
    { name: 'Dramatic Noir', prompt: "Convert the image to a high-contrast black and white 'noir' style. Crush the blacks to be deep and inky, make the whites bright and clean, and expand the mid-tone contrast to create a dramatic, moody, and timeless photographic look. The final image must be monochrome." },
  ];

  const activePrompt = selectedPresetPrompt || customPrompt;

  const handlePresetClick = (prompt: string) => {
    setSelectedPresetPrompt(prompt);
    setCustomPrompt('');
    setBlurIntensity(0);
    setBrightness(0);
    setSaturation(0);
    setVignetteIntensity(0);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPrompt(e.target.value);
    setSelectedPresetPrompt(null);
    setBlurIntensity(0);
    setBrightness(0);
    setSaturation(0);
    setVignetteIntensity(0);
  };

  const handleBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlurIntensity(Number(e.target.value));
    setSelectedPresetPrompt(null);
    setCustomPrompt('');
    setBrightness(0);
    setSaturation(0);
    setVignetteIntensity(0);
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(Number(e.target.value));
    setSelectedPresetPrompt(null);
    setCustomPrompt('');
    setBlurIntensity(0);
    setSaturation(0);
    setVignetteIntensity(0);
  };

  const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaturation(Number(e.target.value));
    setSelectedPresetPrompt(null);
    setCustomPrompt('');
    setBlurIntensity(0);
    setBrightness(0);
    setVignetteIntensity(0);
  };

  const handleVignetteIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVignetteIntensity(Number(e.target.value));
    setSelectedPresetPrompt(null);
    setCustomPrompt('');
    setBlurIntensity(0);
    setBrightness(0);
    setSaturation(0);
  };

  const handleVignetteColorChange = (color: 'black' | 'white') => {
      setVignetteColor(color);
      // Reset other controls if user is interacting with vignette
      if (vignetteIntensity > 0) {
        setSelectedPresetPrompt(null);
        setCustomPrompt('');
        setBlurIntensity(0);
        setBrightness(0);
        setSaturation(0);
      }
  }

  const handleApply = () => {
    if (activePrompt) {
      onApplyAdjustment(activePrompt);
    }
  };

  const handleApplyBlur = () => {
    if (blurIntensity > 0) {
      const blurPrompt = `Apply a realistic, shallow depth-of-field effect to optically separate the main subject from the background. The background should be smoothly and naturally blurred (bokeh) with a blur intensity of ${blurIntensity} out of 10. This effect should draw all attention to the sharp, in-focus subject.`;
      onApplyAdjustment(blurPrompt);
    }
  };

  const handleApplyBrightness = () => {
    if (brightness !== 0) {
      const brightnessPrompt = `Adjust the overall brightness of the image by a value of ${brightness} on a scale from -100 to 100. A positive value increases brightness, making the image lighter, and a negative value decreases it, making the image darker. The change should be applied smoothly across all tonal ranges.`;
      onApplyAdjustment(brightnessPrompt);
    }
  };
  
  const handleApplySaturation = () => {
    if (saturation !== 0) {
      const prompt = `Adjust the overall color saturation of the image by a value of ${saturation} on a scale from -100 (fully desaturated/grayscale) to 100 (highly saturated). A positive value increases color intensity, and a negative value decreases it. The adjustment must be photorealistic and avoid unnatural color clipping or artifacts.`;
      onApplyAdjustment(prompt);
    }
  };

  const handleApplyVignette = () => {
    if (vignetteIntensity > 0) {
      const colorWord = vignetteColor === 'black' ? 'darken' : 'lighten';
      const vignettePrompt = `Apply a photorealistic ${vignetteColor} vignette effect to the image. The intensity should be ${vignetteIntensity} out of 100. This should gradually ${colorWord} the corners and edges of the photo, drawing the viewer's focus towards the center. The transition must be smooth and natural.`;
      onApplyAdjustment(vignettePrompt);
    }
  };

  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col gap-4 animate-fade-in backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-center text-gray-300">Apply a Professional Adjustment</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={onEnhanceQuality}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-purple-600 to-indigo-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-purple-800 disabled:to-indigo-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
          aria-label="Enhance image quality"
          title="Automatically improve sharpness, clarity, and detail"
        >
          <SparkleIcon className="w-5 h-5" />
          Enhance Quality
        </button>
        <button
          onClick={onUpscaleImage}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-teal-600 to-cyan-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-teal-800 disabled:to-cyan-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
          aria-label="Upscale image resolution"
          title="Increase the image resolution for better quality"
        >
          <UpscaleIcon className="w-5 h-5" />
          Upscale Image
        </button>
        <button
          onClick={onColorizeImage}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-amber-700 disabled:to-orange-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
          aria-label="Colorize black and white image"
          title="Add realistic color to a black and white photo"
        >
          <ColorizeIcon className="w-5 h-5" />
          Colorize Photo
        </button>
      </div>

      <div className="flex items-center gap-2 my-1">
        <div className="flex-grow h-px bg-gray-600/50"></div>
        <span className="text-sm text-gray-500">OR</span>
        <div className="flex-grow h-px bg-gray-600/50"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-black/20 p-4 rounded-lg flex flex-col gap-3">
            <div className="flex items-center justify-between">
            <label htmlFor="blur-slider" className="font-semibold text-gray-200">
                Background Blur
            </label>
            <span className="text-sm font-mono bg-gray-700/50 px-2 py-1 rounded">
                {blurIntensity}
            </span>
            </div>
            <input
            id="blur-slider"
            type="range"
            min="0"
            max="10"
            step="1"
            value={blurIntensity}
            onChange={handleBlurChange}
            disabled={isLoading}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            title="Adjust the intensity of the background blur"
            />
            {blurIntensity > 0 && (
            <div className="animate-fade-in">
                <button
                onClick={handleApplyBlur}
                className="w-full mt-2 bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-blue-800 disabled:to-cyan-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading}
                title="Apply the selected background blur intensity"
                >
                Apply Blur (Intensity: {blurIntensity})
                </button>
            </div>
            )}
        </div>
        <div className="bg-black/20 p-4 rounded-lg flex flex-col gap-3">
            <div className="flex items-center justify-between">
            <label htmlFor="brightness-slider" className="font-semibold text-gray-200">
                Brightness
            </label>
            <span className="text-sm font-mono bg-gray-700/50 px-2 py-1 rounded">
                {brightness > 0 ? '+' : ''}{brightness}
            </span>
            </div>
            <input
            id="brightness-slider"
            type="range"
            min="-100"
            max="100"
            step="5"
            value={brightness}
            onChange={handleBrightnessChange}
            disabled={isLoading}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            title="Adjust the image brightness"
            />
            {brightness !== 0 && (
            <div className="animate-fade-in">
                <button
                onClick={handleApplyBrightness}
                className="w-full mt-2 bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-blue-800 disabled:to-cyan-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading}
                title="Apply the selected brightness adjustment"
                >
                Apply Brightness ({brightness > 0 ? '+' : ''}{brightness})
                </button>
            </div>
            )}
        </div>
        <div className="bg-black/20 p-4 rounded-lg flex flex-col gap-3">
            <div className="flex items-center justify-between">
            <label htmlFor="saturation-slider" className="font-semibold text-gray-200">
                Saturation
            </label>
            <span className="text-sm font-mono bg-gray-700/50 px-2 py-1 rounded">
                {saturation > 0 ? '+' : ''}{saturation}
            </span>
            </div>
            <input
            id="saturation-slider"
            type="range"
            min="-100"
            max="100"
            step="5"
            value={saturation}
            onChange={handleSaturationChange}
            disabled={isLoading}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            title="Adjust the image color saturation"
            />
            {saturation !== 0 && (
            <div className="animate-fade-in">
                <button
                onClick={handleApplySaturation}
                className="w-full mt-2 bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-blue-800 disabled:to-cyan-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading}
                title="Apply the selected saturation adjustment"
                >
                Apply Saturation ({saturation > 0 ? '+' : ''}{saturation})
                </button>
            </div>
            )}
        </div>
        <div className="bg-black/20 p-4 rounded-lg flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <label htmlFor="vignette-slider" className="font-semibold text-gray-200">
                    Vignette
                </label>
                <span className="text-sm font-mono bg-gray-700/50 px-2 py-1 rounded">
                    {vignetteIntensity}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleVignetteColorChange('black')} className={`w-full py-1 rounded text-sm transition-colors ${vignetteColor === 'black' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`} disabled={isLoading}>Black</button>
                <button onClick={() => handleVignetteColorChange('white')} className={`w-full py-1 rounded text-sm transition-colors ${vignetteColor === 'white' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`} disabled={isLoading}>White</button>
            </div>
            <input
                id="vignette-slider"
                type="range"
                min="0"
                max="100"
                step="5"
                value={vignetteIntensity}
                onChange={handleVignetteIntensityChange}
                disabled={isLoading}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                title="Adjust the intensity of the vignette effect"
            />
            {vignetteIntensity > 0 && (
            <div className="animate-fade-in">
                <button
                    onClick={handleApplyVignette}
                    className="w-full mt-2 bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-blue-800 disabled:to-cyan-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isLoading}
                    title="Apply the selected vignette"
                >
                    Apply Vignette ({vignetteIntensity})
                </button>
            </div>
            )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {presets.map(preset => (
          <button
            key={preset.name}
            onClick={() => handlePresetClick(preset.prompt)}
            disabled={isLoading}
            className={`w-full text-center bg-white/10 border border-transparent text-gray-200 font-semibold py-3 px-4 rounded-md transition-all duration-200 ease-in-out hover:bg-white/20 hover:border-white/20 active:scale-95 text-sm disabled:opacity-50 disabled:cursor-not-allowed ${selectedPresetPrompt === preset.prompt ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-blue-500' : ''}`}
            title={`Apply the '${preset.name}' preset`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      <input
        type="text"
        value={customPrompt}
        onChange={handleCustomChange}
        placeholder="Or describe a custom adjustment..."
        className="flex-grow bg-gray-800 border border-gray-600 text-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full disabled:cursor-not-allowed disabled:opacity-60 text-base"
        disabled={isLoading}
        title="Describe any custom adjustment you want to make"
      />

      {activePrompt && (
        <div className="animate-fade-in flex flex-col gap-4 pt-2">
            <button
                onClick={handleApply}
                className="w-full bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-blue-800 disabled:to-blue-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading || !activePrompt.trim()}
                title="Apply the selected preset or your custom adjustment"
            >
                Apply Adjustment
            </button>
        </div>
      )}
    </div>
  );
};

export default AdjustmentPanel;