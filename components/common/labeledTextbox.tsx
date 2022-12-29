import React, { ChangeEventHandler } from "react";

type Props = {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
};

export default function LabeledTextbox({ label, onChange, maxLength }: Props) {
  const restrictChars: React.FormEventHandler<HTMLInputElement> = (e) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z0-9]/g, "");
  };

  return (
    <div className="flex flex-row gap-3 items-center">
      <label className="label-text">{label}</label>
      <input
        onChange={onChange}
        type="text"
        className="input input-bordered w-full max-w-xs"
        maxLength={maxLength}
        onInput={restrictChars}
      ></input>
    </div>
  );
}
