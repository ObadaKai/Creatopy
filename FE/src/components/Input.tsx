import React from "react";

interface Props {
  name: string;
  label: string;
  value: string;
  type: string;
  placeholder?: string;
  onChange: (...props: any[]) => void;
}
export default function Input({ name, value, label, type, onChange, placeholder }: Props) {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}:</label>
      <input placeholder={placeholder} name={name} type={type} value={value} onChange={onChange}></input>
    </div>
  );
}
