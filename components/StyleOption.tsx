import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Style } from '../app/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface StyleOptionsProps {
  style: Style
  onChange: (style: Partial<Style>) => void
}

export default function StyleOptions({ style, onChange }: StyleOptionsProps) {
  const fonts = [
    'Arial',
    'Times New Roman',
    'Helvetica',
    'Calibri',
    'Georgia'
  ]

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Style Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="fontFamily">Font Family</Label>
          <Select
            value={style.fontFamily}
            onValueChange={(value) => onChange({ fontFamily: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font} value={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="fontSize">Font Size</Label>
          <Select
            value={style.fontSize}
            onValueChange={(value) => onChange({ fontSize: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {['12px', '14px', '16px', '18px'].map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="primaryColor">Primary Color</Label>
          <Input
            id="primaryColor"
            type="color"
            value={style.primaryColor}
            onChange={(e) => onChange({ primaryColor: e.target.value })}
            className="h-10"
          />
        </div>
        <div>
          <Label htmlFor="secondaryColor">Secondary Color</Label>
          <Input
            id="secondaryColor"
            type="color"
            value={style.secondaryColor}
            onChange={(e) => onChange({ secondaryColor: e.target.value })}
            className="h-10"
          />
        </div>
      </CardContent>
    </Card>
  )
}

