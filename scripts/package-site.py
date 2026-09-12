"""Package this static website when the optional Sites helper is unavailable."""
import io
import json
import pathlib
import sys
import tarfile

project = pathlib.Path(__file__).resolve().parents[1]
output = pathlib.Path(sys.argv[1]).resolve()
manifest_path = project / '.openai' / 'hosting.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8-sig'))
assert manifest['static']['directory'] == 'dist'
assert manifest['project_id']
assert (project / 'dist' / 'index.html').is_file()
assert not output.is_relative_to(project / 'dist')
manifest_bytes = (json.dumps(manifest, indent=2) + '\n').encode()
with tarfile.open(output, 'w:gz') as archive:
    archive.add(project / 'dist', arcname='dist')
    info = tarfile.TarInfo('dist/.openai/hosting.json')
    info.size = len(manifest_bytes)
    archive.addfile(info, io.BytesIO(manifest_bytes))
with tarfile.open(output, 'r:gz') as archive:
    names = archive.getnames()
    assert 'dist/index.html' in names
    assert 'dist/.openai/hosting.json' in names
    assert not any('/.git/' in name or '..' in pathlib.PurePosixPath(name).parts for name in names)
print(f'Validated static archive: {output.name}, {len(names)} entries, {output.stat().st_size} bytes')
