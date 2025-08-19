"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase/client"
import type { College } from "@/types/college"

interface AddCollegeFormProps {
  onSuccess: (college: College) => void
}

export default function AddCollegeForm({ onSuccess }: AddCollegeFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    city: "",
    state: "",
    established_year: "",
    ranking_nirf: "",
    contact_phone: "",
    contact_email: "",
    website_url: "",
    approval: "",
    affiliation: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const collegeData = {
        ...formData,
        established_year: Number.parseInt(formData.established_year),
        ranking_nirf: formData.ranking_nirf ? Number.parseInt(formData.ranking_nirf) : null,
        location: `${formData.city}, ${formData.state}`,
      }

      const { data, error } = await supabase.from("colleges").insert([collegeData]).select().single()

      if (error) {
        console.error("Error adding college:", error)
        alert("Failed to add college")
        return
      }

      onSuccess(data as College)

      // Reset form
      setFormData({
        name: "",
        type: "",
        city: "",
        state: "",
        established_year: "",
        ranking_nirf: "",
        contact_phone: "",
        contact_email: "",
        website_url: "",
        approval: "",
        affiliation: "",
      })
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to add college")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">College Name *</Label>
          <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">College Type *</Label>
          <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Medical">Medical</SelectItem>
              <SelectItem value="Both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input id="city" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input id="state" value={formData.state} onChange={(e) => handleChange("state", e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="established_year">Established Year *</Label>
          <Input
            id="established_year"
            type="number"
            value={formData.established_year}
            onChange={(e) => handleChange("established_year", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ranking_nirf">NIRF Ranking</Label>
          <Input
            id="ranking_nirf"
            type="number"
            value={formData.ranking_nirf}
            onChange={(e) => handleChange("ranking_nirf", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_phone">Contact Phone</Label>
          <Input
            id="contact_phone"
            value={formData.contact_phone}
            onChange={(e) => handleChange("contact_phone", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_email">Contact Email</Label>
          <Input
            id="contact_email"
            type="email"
            value={formData.contact_email}
            onChange={(e) => handleChange("contact_email", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website_url">Website URL</Label>
          <Input
            id="website_url"
            type="url"
            value={formData.website_url}
            onChange={(e) => handleChange("website_url", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="approval">Approval Body</Label>
          <Input
            id="approval"
            value={formData.approval}
            onChange={(e) => handleChange("approval", e.target.value)}
            placeholder="e.g., AICTE, MCI"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="affiliation">University Affiliation</Label>
        <Input
          id="affiliation"
          value={formData.affiliation}
          onChange={(e) => handleChange("affiliation", e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          {loading ? "Adding..." : "Add College"}
        </Button>
      </div>
    </form>
  )
}
