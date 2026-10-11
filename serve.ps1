param([string]$Root, [int]$Port = 8080)
$mime = @{ '.html'='text/html; charset=utf-8'; '.js'='application/javascript'; '.mjs'='application/javascript'; '.css'='text/css'; '.json'='application/json'; '.svg'='image/svg+xml'; '.png'='image/png'; '.jpg'='image/jpeg'; '.webp'='image/webp'; '.ico'='image/x-icon'; '.woff2'='font/woff2'; '.woff'='font/woff' }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$Port/")
$l.Start()
Write-Output "Serving $Root at http://localhost:$Port/"
while ($l.IsListening) {
  $ctx = $l.GetContext()
  $p = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
  $f = Join-Path $Root $p
  if (Test-Path $f -PathType Container) { $f = Join-Path $f 'index.html' }
  if (Test-Path $f -PathType Leaf) {
    $ext = [IO.Path]::GetExtension($f).ToLower()
    $ctx.Response.ContentType = $(if ($mime[$ext]) { $mime[$ext] } else { 'application/octet-stream' })
    $ctx.Response.Headers.Add('Cache-Control', 'no-store, must-revalidate')
    $b = [IO.File]::ReadAllBytes($f)
    $ctx.Response.OutputStream.Write($b, 0, $b.Length)
  } else { $ctx.Response.StatusCode = 404 }
  $ctx.Response.Close()
}
